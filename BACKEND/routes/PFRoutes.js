const express = require("express");
const router = express.Router();

const controller = require("../controllers/PFController");

// Public Routes

// Get all premium features
router.get("/", controller.getAllFeatures);

// Get premium feature by ID
router.get("/:id", controller.getFeatureById);


// Anyone can add premium feature
router.post("/", controller.addFeature);

// Anyone can update premium feature
router.put("/:id", controller.updateFeature);

// Anyone can delete premium feature
router.delete("/:id", controller.deleteFeature);

module.exports = router;