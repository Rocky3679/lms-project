const express = require("express");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const authenticateToken = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authenticateToken, (req, res) => {
    res.json({
        success: true,
        message: "Protected route accessed successfully",
        user: req.user
    });
});

router.get(
    "/admin",
    authenticateToken,
    authorizeRoles("admin"),
    (req, res) => {

        res.json({
            success: true,
            message: "Welcome Admin!"
        });

    }
);

module.exports = router;