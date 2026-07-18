const {
    enrollStudent,
    getStudentEnrollments,
    getCourseEnrollments,
    deleteEnrollment
} = require("../models/enrollmentModel");

// Student Enroll
const createEnrollment = async (req, res) => {

    try {

        const { course_id } = req.body;

        if (!course_id) {
            return res.status(400).json({
                success: false,
                message: "course_id is required"
            });
        }

        const student_id = req.user.id;

        const enrollment = await enrollStudent(
            student_id,
            course_id
        );

        res.status(201).json({
            success: true,
            message: "Enrollment successful",
            enrollment
        });

    } catch (error) {

        console.error(error);

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Student already enrolled in this course"
            });
        }

        res.status(500).json({
            success: false,
            message: "Enrollment failed"
        });

    }

};

// Student's Courses
const fetchStudentEnrollments = async (req, res) => {

    try {

        const enrollments = await getStudentEnrollments(req.user.id);

        res.json({
            success: true,
            total: enrollments.length,
            enrollments
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch enrollments"
        });

    }

};

// Students in a Course
const fetchCourseEnrollments = async (req, res) => {

    try {

        const { courseId } = req.params;

        const enrollments = await getCourseEnrollments(courseId);

        res.json({
            success: true,
            total: enrollments.length,
            enrollments
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch course enrollments"
        });

    }

};

// Delete Enrollment
const removeEnrollment = async (req, res) => {

    try {

        const { id } = req.params;

        const enrollment = await deleteEnrollment(id);

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found"
            });
        }

        res.json({
            success: true,
            message: "Enrollment deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete enrollment"
        });

    }

};

module.exports = {
    createEnrollment,
    fetchStudentEnrollments,
    fetchCourseEnrollments,
    removeEnrollment
};