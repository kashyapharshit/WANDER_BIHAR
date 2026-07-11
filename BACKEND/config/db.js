const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Connect to the database using the URI from the .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);

        // Exit the process with a failure code if the connection drops
        process.exit(1);
    }
};

module.exports = connectDB;