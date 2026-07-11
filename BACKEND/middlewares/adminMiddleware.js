const verifyAdmin = (req, res, next) => {
    try {
        // Ensure the user object exists (meaning authMiddleware ran successfully)
        if (!req.user) {
            return res.status(401).json({
                message: "Access Denied"
            });
        }

        // Check if the user role is admin
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Admin Access Only"
            });
        }

        next();

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = verifyAdmin;