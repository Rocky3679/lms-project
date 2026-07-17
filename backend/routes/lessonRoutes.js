const express = require("express");

const router = express.Router();

const {
    addLesson,
    fetchLessonsByCourse,
    fetchLessonById,
    editLesson,
    removeLesson
} = require("../controllers/lessonController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Get lessons by course
router.get(
    "/course/:courseId",
    authenticateToken,
    fetchLessonsByCourse
);

// Get lesson by ID
router.get(
    "/:id",
    authenticateToken,
    fetchLessonById
);

// Create lesson
router.post(
    "/",
    authenticateToken,
    authorizeRoles("admin", "instructor"),
    addLesson
);

// Update lesson
router.put(
    "/:id",
    authenticateToken,
    authorizeRoles("admin", "instructor"),
    editLesson
);

// Delete lesson
router.delete(
    "/:id",
    authenticateToken,
    authorizeRoles("admin", "instructor"),
    removeLesson
);

module.exports = router;