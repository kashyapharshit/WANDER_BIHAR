const PremiumPlan = require("../models/PremiumPlan");

// GET ALL PREMIUM PLANS
exports.getAllPremiumPlans = async (req, res) => {
    try {
        const plans = await PremiumPlan.find();

        res.status(200).json({
            success: true,
            data: plans
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET PLAN BY CUSTOM ID (plan-1)
exports.getPremiumPlanById = async (req, res) => {
    try {
        const plan = await PremiumPlan.findOne({
            id: req.params.id
        });

        if (!plan) {
            return res.status(404).json({
                success: false,
                message: "Premium plan not found"
            });
        }

        res.status(200).json({
            success: true,
            data: plan
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// CREATE PREMIUM PLAN
exports.createPremiumPlan = async (req, res) => {
    try {
        // Validate ID format (plan-1, plan-2...)
        if (!/^plan-\d+$/.test(req.body.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid plan ID format. Use plan-1, plan-2..."
            });
        }

        // Check duplicate ID or title
        const existingPlan = await PremiumPlan.findOne({
            $or: [
                { id: req.body.id },
                { title: req.body.title }
            ]
        });

        if (existingPlan) {
            return res.status(400).json({
                success: false,
                message: "Plan ID or title already exists"
            });
        }

        const plan = await PremiumPlan.create(req.body);

        res.status(201).json({
            success: true,
            message: "Premium plan created successfully",
            data: plan
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE PREMIUM PLAN
exports.updatePremiumPlan = async (req, res) => {
    try {
        // Prevent changing read-only ID
        delete req.body.id;

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields to update"
            });
        }

        const plan = await PremiumPlan.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!plan) {
            return res.status(404).json({
                success: false,
                message: "Premium plan not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Premium plan updated successfully",
            data: plan
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE PREMIUM PLAN
exports.deletePremiumPlan = async (req, res) => {
    try {
        const plan = await PremiumPlan.findOne({
            id: req.params.id
        });

        if (!plan) {
            return res.status(404).json({
                success: false,
                message: "Premium plan not found"
            });
        }

        await plan.deleteOne();

        res.status(200).json({
            success: true,
            message: "Premium plan deleted successfully"
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};