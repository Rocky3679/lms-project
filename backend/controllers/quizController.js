const {
    createQuiz,
    getQuizzesByCourse,
    getQuizById,
    updateQuiz,
    deleteQuiz
} = require("../models/quizModel");

// Create Quiz
const addQuiz = async (req, res) => {

    try {

        const {
            course_id,
            title,
            description,
            total_marks,
            time_limit
        } = req.body;

        if (!course_id || !title) {
            return res.status(400).json({
                success: false,
                message: "course_id and title are required"
            });
        }

        const quiz = await createQuiz(
            course_id,
            title,
            description,
            total_marks,
            time_limit
        );

        res.status(201).json({
            success: true,
            message: "Quiz created successfully",
            quiz
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create quiz"
        });

    }

};

// Get Quizzes By Course
const fetchQuizzesByCourse = async (req, res) => {

    try {

        const { courseId } = req.params;

        const quizzes = await getQuizzesByCourse(courseId);

        res.json({
            success: true,
            total: quizzes.length,
            quizzes
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch quizzes"
        });

    }

};

// Get Quiz By ID
const fetchQuizById = async (req, res) => {

    try {

        const { id } = req.params;

        const quiz = await getQuizById(id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        res.json({
            success: true,
            quiz
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch quiz"
        });

    }

};

// Update Quiz
const editQuiz = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            description,
            total_marks,
            time_limit
        } = req.body;

        const existingQuiz = await getQuizById(id);

        if (!existingQuiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        const quiz = await updateQuiz(
            id,
            title,
            description,
            total_marks,
            time_limit
        );

        res.json({
            success: true,
            message: "Quiz updated successfully",
            quiz
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update quiz"
        });

    }

};

// Delete Quiz
const removeQuiz = async (req, res) => {

    try {

        const { id } = req.params;

        const existingQuiz = await getQuizById(id);

        if (!existingQuiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        await deleteQuiz(id);

        res.json({
            success: true,
            message: "Quiz deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete quiz"
        });

    }

};

module.exports = {
    addQuiz,
    fetchQuizzesByCourse,
    fetchQuizById,
    editQuiz,
    removeQuiz
};