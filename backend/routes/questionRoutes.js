const express = require("express");

const router = express.Router();

const {
    addQuestion,
    fetchQuestionsByQuiz,
    fetchQuestionById,
    editQuestion,
    removeQuestion
} = require("../controllers/questionController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Get all questions of a quiz
router.get(
    "/quiz/:quizId",
    authenticateToken,
    fetchQuestionsByQuiz
);

// Get question by ID
router.get(
    "/:id",
    authenticateToken,
    fetchQuestionById
);

// Create question
router.post(
    "/",
    authenticateToken,
    authorizeRoles("admin", "instructor"),
    addQuestion
);

// Update question
router.put(
    "/:id",
    authenticateToken,
    authorizeRoles("admin", "instructor"),
    editQuestion
);

// Delete question
router.delete(
    "/:id",
    authenticateToken,
    authorizeRoles("admin"),
    removeQuestion
);

module.exports = router;