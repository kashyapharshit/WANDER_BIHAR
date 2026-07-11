const mongoose = require("mongoose");

const premiumPlanSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            immutable: true
        },

        category: {
            type: String,
            required: true,
            enum: ["core features", "pricing plan"]
        },

        title: {
            type: String,
            required: true,
            enum: ["monthly plan", "annual plan"]

        },

        icon: {
            type: String,
            required: true
        },


        price: {
            type: Number,
            default: null
        },

        topBadge: {
            type: String,
            default: ""
        },


        description: {
            type: String,
            required: true
        },

        bulletPoints: {
            type: [String],
            default: []
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        }
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.models.PremiumPlan || mongoose.model("PremiumPlan", premiumPlanSchema);