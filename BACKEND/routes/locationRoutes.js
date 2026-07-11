const express = require("express");
const router = express.Router();

const {
    createLocation,
    getLocations,
    getPlaceById,
    updatePlace
} = require("../controllers/locationController");

// POST a new location division
router.post("/", createLocation);

// GET all locations and places
router.get("/", getLocations);

// GET a specific place by its ID (used for fetching a single subdocument)
router.get("/place/:id", getPlaceById);

// PUT update a specific place by its ID (Connects to React Edit Form!)
router.put("/place/:placeId", updatePlace);

module.exports = router;