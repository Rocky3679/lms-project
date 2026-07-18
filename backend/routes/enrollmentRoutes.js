const express = require("express");

const router = express.Router();

const {
    createEnrollment,
    fetchStudentEnrollments,
    fetchCourseEnrollments,
    removeEnrollment
} = require("../controllers/enrollmentController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Student enroll
router.post(
    "/",
    authenticateToken,
    authorizeRoles("student"),
    createEnrollment
);

// Student's enrolled courses
router.get(
    "/student",
    authenticateToken,
    authorizeRoles("student"),
    fetchStudentEnrollments
);

// Students enrolled in a course
router.get(
    "/course/:courseId",
    authenticateToken,
    authorizeRoles("admin", "instructor"),
    fetchCourseEnrollments
);

// Delete enrollment
router.delete(
    "/:id",
    authenticateToken,
    authorizeRoles("admin", "student"),
    removeEnrollment
);

module.exports = router;