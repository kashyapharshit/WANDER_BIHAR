const express = require("express");

const router = express.Router();

const auth = require("../middlewares/authMiddleware");

const {
    createPayment
} = require("../controllers/paymentController");


// Payment checkout route
router.post(
    "/checkout",
    auth,
    createPayment
);


module.exports = router;