const PremiumFeature = require("../models/PremiumFeature");

// GET ALL FEATURES
exports.getAllFeatures = async (req, res) => {
    try {
        const features = await PremiumFeature.find();

        res.status(200).json({
            success: true,
            data: features
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET FEATURE BY CUSTOM ID (feat-1)
exports.getFeatureById = async (req, res) => {
    try {
        const feature = await PremiumFeature.findOne({
            id: req.params.id
        });

        if (!feature) {
            return res.status(404).json({
                success: false,
                message: "Feature not found"
            });
        }

        res.status(200).json({
            success: true,
            data: feature
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ADD FEATURE
exports.addFeature = async (req, res) => {
    try {
        // Validate ID format (feat-1, feat-2...)
        if (!/^feat-\d+$/.test(req.body.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid feature ID format. Use feat-1, feat-2..."
            });
        }

        // Check duplicate ID or title
        const existingFeature = await PremiumFeature.findOne({
            $or: [
                { id: req.body.id },
                { title: req.body.title }
            ]
        });

        if (existingFeature) {
            return res.status(400).json({
                success: false,
                message: "Feature ID or title already exists"
            });
        }

        const feature = await PremiumFeature.create(req.body);

        res.status(201).json({
            success: true,
            message: "Feature added successfully",
            data: feature
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE FEATURE
exports.updateFeature = async (req, res) => {
    try {
        // Prevent changing read-only ID
        delete req.body.id;

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields to update"
            });
        }

        const feature = await PremiumFeature.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!feature) {
            return res.status(404).json({
                success: false,
                message: "Feature not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Feature updated successfully",
            data: feature
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE FEATURE
exports.deleteFeature = async (req, res) => {
    try {
        const feature = await PremiumFeature.findOne({
            id: req.params.id
        });

        if (!feature) {
            return res.status(404).json({
                success: false,
                message: "Feature not found"
            });
        }

        await feature.deleteOne();

        res.status(200).json({
            success: true,
            message: "Feature deleted successfully"
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};