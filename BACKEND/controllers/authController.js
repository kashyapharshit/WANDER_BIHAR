const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ message: "Login successful", token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single user
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { name, email, role, status } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role, status },
            { new: true, runValidators: true }
        ).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const activatePremium = async (req, res) => {
    try {

        const userId = req.user.id;

        const user = await User.findById(userId);


        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        user.role = "premium";
        user.isPremium = true;
        user.premiumExpiry = new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
        );


        await user.save();


        res.status(200).json({

            message: "Premium activated successfully",
            role: user.role,
            isPremium: user.isPremium,
            premiumExpiry: user.premiumExpiry

        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = { register, login, getUsers, getUserById, updateUser, deleteUser, activatePremium };