const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        plan: {
            type: String,
            required: true,
            default: "Monthly"
        },

        paymentStatus: {
            type: String,
            default: "Pending"
        },

        transactionId: {
            type: String,
            unique: true
        },

        paymentDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);


const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;