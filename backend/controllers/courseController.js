const {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} = require("../models/courseModel");

// Create Course
const addCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            duration,
            price,
            thumbnail
        } = req.body;

        if (!title || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "Title, description and category are required"
            });
        }

        const instructor_id = req.user.id;

        const course = await createCourse(
            title,
            description,
            category,
            duration,
            price,
            thumbnail,
            instructor_id
        );

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            course
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create course"
        });
    }
};

// Get All Courses
const fetchCourses = async (req, res) => {
    try {

        const courses = await getAllCourses();

        res.json({
            success: true,
            total: courses.length,
            courses
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch courses"
        });

    }
};

// Get Course By ID
const fetchCourseById = async (req, res) => {
    try {

        const { id } = req.params;

        const course = await getCourseById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        res.json({
            success: true,
            course
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch course"
        });

    }
};

// Update Course
const editCourse = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            title,
            description,
            category,
            duration,
            price,
            thumbnail
        } = req.body;

        const existingCourse = await getCourseById(id);

        if (!existingCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const course = await updateCourse(
            id,
            title,
            description,
            category,
            duration,
            price,
            thumbnail
        );

        res.json({
            success: true,
            message: "Course updated successfully",
            course
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update course"
        });

    }
};

// Delete Course
const removeCourse = async (req, res) => {
    try {

        const { id } = req.params;

        const existingCourse = await getCourseById(id);

        if (!existingCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        await deleteCourse(id);

        res.json({
            success: true,
            message: "Course deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete course"
        });

    }
};

module.exports = {
    addCourse,
    fetchCourses,
    fetchCourseById,
    editCourse,
    removeCourse
};