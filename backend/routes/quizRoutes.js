const express = require("express");

const router = express.Router();

const {
    addQuiz,
    fetchQuizzesByCourse,
    fetchQuizById,
    editQuiz,
    removeQuiz
} = require("../controllers/quizController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Get quizzes by course
router.get(
    "/course/:courseId",
    authenticateToken,
    fetchQuizzesByCourse
);

// Get quiz by ID
router.get(
    "/:id",
    authenticateToken,
    fetchQuizById
);

// Create quiz
router.post(
    "/",
    authenticateToken,
    authorizeRoles("admin", "instructor"),
    addQuiz
);

// Update quiz
router.put(
    "/:id",
    authenticateToken,
    authorizeRoles("admin", "instructor"),
    editQuiz
);

// Delete quiz
router.delete(
    "/:id",
    authenticateToken,
    authorizeRoles("admin", "instructor"),
    removeQuiz
);

module.exports = router;