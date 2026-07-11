const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    entry: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    est: {
        type: String,
        required: true,
    },
    premium: {
        type: Boolean,
        default: false,
    },
});

const locationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        places: [placeSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);