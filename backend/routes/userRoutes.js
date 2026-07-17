const express = require("express");

const router = express.Router();

const {
    fetchUsers,
    changeUserRole
} = require("../controllers/userController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Admin only
router.get(
    "/",
    authenticateToken,
    authorizeRoles("admin"),
    fetchUsers
);

router.put(
    "/:id/role",
    authenticateToken,
    authorizeRoles("admin"),
    changeUserRole
);

module.exports = router;