const bcrypt = require("bcryptjs");
const { createUser } = require("../models/userModel");

const registerUser = async (req, res) => {
    try {
        const { full_name, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser(
            full_name,
            email,
            hashedPassword,
            role || "student"
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Registration failed"
        });
    }
};

module.exports = {
    registerUser
};