const {
    createLesson,
    getLessonsByCourse,
    getLessonById,
    updateLesson,
    deleteLesson
} = require("../models/lessonModel");

// Create Lesson
const addLesson = async (req, res) => {

    try {

        const {
            course_id,
            title,
            description,
            video_url,
            lesson_order,
            duration
        } = req.body;

        if (!course_id || !title || !lesson_order) {
            return res.status(400).json({
                success: false,
                message: "course_id, title and lesson_order are required"
            });
        }

        const lesson = await createLesson(
            course_id,
            title,
            description,
            video_url,
            lesson_order,
            duration
        );

        res.status(201).json({
            success: true,
            message: "Lesson created successfully",
            lesson
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create lesson"
        });

    }

};

// Get Lessons By Course
const fetchLessonsByCourse = async (req, res) => {

    try {

        const { courseId } = req.params;

        const lessons = await getLessonsByCourse(courseId);

        res.json({
            success: true,
            total: lessons.length,
            lessons
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch lessons"
        });

    }

};

// Get Lesson By ID
const fetchLessonById = async (req, res) => {

    try {

        const { id } = req.params;

        const lesson = await getLessonById(id);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }

        res.json({
            success: true,
            lesson
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch lesson"
        });

    }

};

// Update Lesson
const editLesson = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            description,
            video_url,
            lesson_order,
            duration
        } = req.body;

        const existingLesson = await getLessonById(id);

        if (!existingLesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }

        const lesson = await updateLesson(
            id,
            title,
            description,
            video_url,
            lesson_order,
            duration
        );

        res.json({
            success: true,
            message: "Lesson updated successfully",
            lesson
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update lesson"
        });

    }

};

// Delete Lesson
const removeLesson = async (req, res) => {

    try {

        const { id } = req.params;

        const existingLesson = await getLessonById(id);

        if (!existingLesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }

        await deleteLesson(id);

        res.json({
            success: true,
            message: "Lesson deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete lesson"
        });

    }

};

module.exports = {
    addLesson,
    fetchLessonsByCourse,
    fetchLessonById,
    editLesson,
    removeLesson
};