const Location = require("../models/Location");

// POST
const createLocation = async (req, res) => {
    try {
        const location = await Location.create(req.body);
        res.status(201).json({
            success: true,
            message: "Location Added Successfully",
            data: location,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET ALL
const getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json({
            success: true,
            data: locations,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET SINGLE PLACE BY ID
const getPlaceById = async (req, res) => {
    try {
        const placeId = req.params.id;

        // Find the parent Location that contains a place with this ID
        const location = await Location.findOne({ "places._id": placeId });

        if (!location) {
            return res.status(404).json({ success: false, message: "Place not found" });
        }

        // Extract the specific place
        const place = location.places.id(placeId);

        res.status(200).json({ success: true, data: place });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ success: false, message: "Invalid ID format" });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// PUT - UPDATE SINGLE PLACE
const updatePlace = async (req, res) => {
    try {
        const { placeId } = req.params;
        const updatedData = req.body;

        const location = await Location.findOneAndUpdate(
            { "places._id": placeId },
            {
                $set: {
                    "places.$.title": updatedData.title,
                    "places.$.location": updatedData.location,
                    "places.$.image": updatedData.image,
                    "places.$.entry": updatedData.entry,
                    "places.$.rating": updatedData.rating,
                    "places.$.type": updatedData.type,
                    "places.$.est": updatedData.est,
                    "places.$.premium": updatedData.premium || false
                }
            },
            { new: true }
        );

        if (!location) {
            return res.status(404).json({ success: false, message: "Place not found" });
        }

        res.status(200).json({ success: true, message: "Place updated!", data: location });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createLocation,
    getLocations,
    getPlaceById,
    updatePlace
};