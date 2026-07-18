const {
    createQuestion,
    getQuestionsByQuiz,
    getQuestionById,
    updateQuestion,
    deleteQuestion
} = require("../models/questionModel");

// Create Question
const addQuestion = async (req, res) => {

    try {

        const {
            quiz_id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            marks
        } = req.body;

        if (
            !quiz_id ||
            !question ||
            !option_a ||
            !option_b ||
            !option_c ||
            !option_d ||
            !correct_option
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        const newQuestion = await createQuestion(
            quiz_id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            marks || 1
        );

        res.status(201).json({
            success: true,
            message: "Question created successfully",
            question: newQuestion
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create question"
        });

    }

};

// Get Questions By Quiz
const fetchQuestionsByQuiz = async (req, res) => {

    try {

        const { quizId } = req.params;

        const questions = await getQuestionsByQuiz(quizId);

        res.json({
            success: true,
            total: questions.length,
            questions
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch questions"
        });

    }

};

// Get Question By ID
const fetchQuestionById = async (req, res) => {

    try {

        const { id } = req.params;

        const question = await getQuestionById(id);

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        res.json({
            success: true,
            question
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch question"
        });

    }

};

// Update Question
const editQuestion = async (req, res) => {

    try {

        const { id } = req.params;

        const existingQuestion = await getQuestionById(id);

        if (!existingQuestion) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        const {
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            marks
        } = req.body;

        const updatedQuestion = await updateQuestion(
            id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            marks
        );

        res.json({
            success: true,
            message: "Question updated successfully",
            question: updatedQuestion
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update question"
        });

    }

};

// Delete Question
const removeQuestion = async (req, res) => {

    try {

        const { id } = req.params;

        const existingQuestion = await getQuestionById(id);

        if (!existingQuestion) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        await deleteQuestion(id);

        res.json({
            success: true,
            message: "Question deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete question"
        });

    }

};

module.exports = {
    addQuestion,
    fetchQuestionsByQuiz,
    fetchQuestionById,
    editQuestion,
    removeQuestion
};