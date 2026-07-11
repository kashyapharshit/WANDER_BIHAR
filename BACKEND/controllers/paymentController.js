const Payment = require("../models/payment");
const User = require("../models/User");

exports.createPayment = async (req, res) => {

    try {

        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user"
            });
        }


        const {
            phone,
            amount,
            plan
        } = req.body;



        // Find logged in user
        const user = await User.findById(req.user.id);


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }



        // Create payment record
        const payment = await Payment.create({

            user: req.user.id,
            name: user.name,
            email: user.email,
            phone,
            amount,
            plan,
            paymentStatus: "Success",
            transactionId: "TXN" + Date.now()

        });



        // Activate premium
        await User.findByIdAndUpdate(req.user.id, {

            role: "premium",
            isPremium: true,
            premiumPlan: plan,
            premiumExpiry: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
            )

        });



        res.status(200).json({

            success: true,
            message: "Premium Activated",
            payment

        });



    } catch (error) {
console.log("PAYMENT ERROR:", error);

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};