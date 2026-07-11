const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        // FIXED: Added "premium" to the allowed roles
        enum: ["user", "admin", "premium"],
        default: "user",
    },
    // FIXED: Explicitly defined premium fields so Mongoose saves them
    isPremium: {
        type: Boolean,
        default: false,
    },
    premiumPlan: {
        type: String,
        default: null,
    },
    premiumExpiry: {
        type: Date,
        default: null,
    }
});

// FIXED: Prevents OverwriteModelError during Nodemon restarts
module.exports = mongoose.models.User || mongoose.model("User", userSchema);