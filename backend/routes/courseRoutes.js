const express = require("express");

const router = express.Router();

const {
    addCourse,
    fetchCourses,
    fetchCourseById,
    editCourse,
    removeCourse
} = require("../controllers/courseController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Get all courses (Logged-in users)
router.get(
    "/",
    authenticateToken,
    fetchCourses
);

// Get course by ID (Logged-in users)
router.get(
    "/:id",
    authenticateToken,
    fetchCourseById
);

// Create course (Admin & Instructor)
router.post(
    "/",
    authenticateToken,
    authorizeRoles("admin", "instructor"),
    addCourse
);

// Update course (Admin & Instructor)
router.put(
    "/:id",
    authenticateToken,
    authorizeRoles("admin", "instructor"),
    editCourse
);

// Delete course (Admin & Instructor)
router.delete(
    "/:id",
    authenticateToken,
    authorizeRoles("admin", "instructor"),
    removeCourse
);

module.exports = router;