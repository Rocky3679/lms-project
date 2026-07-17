const {
    getAllUsers,
    updateUserRole
} = require("../models/userModel");

// Get All Users
const fetchUsers = async (req, res) => {

    try {

        const users = await getAllUsers();

        res.json({
            success: true,
            total: users.length,
            users
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        });

    }

};

// Update User Role
const changeUserRole = async (req, res) => {

    try {

        const { id } = req.params;
        const { role } = req.body;

        if (!["admin", "instructor", "student"].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role"
            });
        }

        const user = await updateUserRole(id, role);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "User role updated successfully",
            user
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update user role"
        });

    }

};

module.exports = {
    fetchUsers,
    changeUserRole
};