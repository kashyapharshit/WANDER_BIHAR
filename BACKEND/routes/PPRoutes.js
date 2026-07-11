const express = require("express");
const router = express.Router();

const controller = require("../controllers/PPController");

// Public Routes

// Get all premium plans
router.get("/", controller.getAllPremiumPlans);

// Get premium plan by ID
router.get("/:id", controller.getPremiumPlanById);


// Anyone can create premium plan
router.post("/", controller.createPremiumPlan);

// Anyone can update premium plan
router.put("/:id", controller.updatePremiumPlan);

// Anyone can delete premium plan
router.delete("/:id", controller.deletePremiumPlan);

module.exports = router;