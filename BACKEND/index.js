const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// 1. Import Routes
const authRoutes = require("./routes/authRoutes");
const locationRoutes = require("./routes/locationRoutes");
const pfRoutes = require("./routes/PFRoutes");
const ppRoutes = require("./routes/PPRoutes");
const paymentRoutes = require("./routes/paymentRoutes");   // ✅ Added

// 2. Load Environment Variables
dotenv.config();

// 3. Initialize Express App
const app = express();

// 4. Global Middleware
app.use(cors());
app.use(express.json());

// 5. Connect to MongoDB
connectDB();

// 6. Mount Routes to Base Endpoints
app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/premium/features", pfRoutes);
app.use("/api/premium/plans", ppRoutes);
app.use("/api/payment", paymentRoutes);   // ✅ Added

// Base sanity-check route
app.get("/", (req, res) => {
    res.send("BIHAR_BACKEND is running smoothly...");
});

// 7. Start the Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});