import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { jwtSecret } from "../config/load.js";

// Utility function to generate a JWT token
const genToken = (id) => jwt.sign({ id }, jwtSecret, { expiresIn: "7d" });
const verifyToken = (token) => jwt.verify(token, jwtSecret);

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist",
            });
        }

        // Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Generate a JWT token
        const token = genToken(user._id);
        return res.json({
            success: true,
            message: "Login successful",
            token,
        });
    } catch (err) {
        console.error("Error in loginUser:", err);
        return res.json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({
                success: false,
                message: "User already exists",
            });
        }

        // Validate email format and password strength
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Invalid email format",
            });
        }
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Password must be at least 8 characters long",
            });
        }

        // Hash the user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        // Generate a JWT token
        const token = genToken(user._id);
        return res.json({
            success: true,
            message: "User registered successfully",
            token,
        });
    } catch (err) {
        console.error("Error in registerUser:", err);
        return res.json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided. Unauthorized.",
        });
    }

    try {
        // Verify the token
        const decoded = verifyToken(token);
        const userId = decoded.id;  // Extract user ID from the token

        // Find and delete the user using the userId
        const user = await userModel.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.json({
            success: true,
            message: "User deleted successfully.",
        });
    } catch (err) {
        console.error("Error in deleteUser:", err);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

export { loginUser, registerUser, deleteUser };
