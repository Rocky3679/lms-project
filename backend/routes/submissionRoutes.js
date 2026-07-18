const express = require("express");

const router = express.Router();

const {
    addSubmission,
    fetchMySubmissions,
    fetchSubmissionsByAssignment,
    gradeSubmission,
    removeSubmission
} = require("../controllers/submissionController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Student submits assignment
router.post(
    "/",
    authenticateToken,
    authorizeRoles("student"),
    addSubmission
);

// Student views own submissions
router.get(
    "/my",
    authenticateToken,
    authorizeRoles("student"),
    fetchMySubmissions
);

// Instructor/Admin views submissions for an assignment
router.get(
    "/assignment/:assignmentId",
    authenticateToken,
    authorizeRoles("admin", "instructor"),
    fetchSubmissionsByAssignment
);

// Instructor/Admin grades submission
router.put(
    "/:id",
    authenticateToken,
    authorizeRoles("admin", "instructor"),
    gradeSubmission
);

// Admin deletes submission
router.delete(
    "/:id",
    authenticateToken,
    authorizeRoles("admin"),
    removeSubmission
);

module.exports = router;