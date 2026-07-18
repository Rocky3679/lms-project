const express = require("express");

const router = express.Router();

const {
    addAssignment,
    fetchAssignmentsByCourse,
    fetchAssignmentById,
    editAssignment,
    removeAssignment
} = require("../controllers/assignmentController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Get assignments by course
router.get(
    "/course/:courseId",
    authenticateToken,
    fetchAssignmentsByCourse
);

// Get assignment by ID
router.get(
    "/:id",
    authenticateToken,
    fetchAssignmentById
);

// Create assignment
router.post(
    "/",
    authenticateToken,
    authorizeRoles("admin", "instructor"),
    addAssignment
);

// Update assignment
router.put(
    "/:id",
    authenticateToken,
    authorizeRoles("admin", "instructor"),
    editAssignment
);

// Delete assignment
router.delete(
    "/:id",
    authenticateToken,
    authorizeRoles("admin", "instructor"),
    removeAssignment
);

module.exports = router;