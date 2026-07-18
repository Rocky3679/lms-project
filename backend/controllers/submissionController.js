const {
    createSubmission,
    checkSubmissionExists,
    getMySubmissions,
    getSubmissionsByAssignment,
    getSubmissionById,
    updateSubmissionMarks,
    deleteSubmission
} = require("../models/submissionModel");

// Create Submission
const addSubmission = async (req, res) => {

    try {

        const {
            assignment_id,
            submission_text,
            file_url
        } = req.body;

        const student_id = req.user.id;

        if (!assignment_id) {
            return res.status(400).json({
                success: false,
                message: "assignment_id is required"
            });
        }

        const alreadySubmitted = await checkSubmissionExists(
            assignment_id,
            student_id
        );

        if (alreadySubmitted) {
            return res.status(400).json({
                success: false,
                message: "Assignment already submitted"
            });
        }

        const submission = await createSubmission(
            assignment_id,
            student_id,
            submission_text,
            file_url
        );

        res.status(201).json({
            success: true,
            message: "Assignment submitted successfully",
            submission
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to submit assignment"
        });

    }

};

// Get My Submissions
const fetchMySubmissions = async (req, res) => {

    try {

        const submissions = await getMySubmissions(req.user.id);

        res.json({
            success: true,
            total: submissions.length,
            submissions
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch submissions"
        });

    }

};

// Get Submissions By Assignment
const fetchSubmissionsByAssignment = async (req, res) => {

    try {

        const { assignmentId } = req.params;

        const submissions = await getSubmissionsByAssignment(
            assignmentId
        );

        res.json({
            success: true,
            total: submissions.length,
            submissions
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch submissions"
        });

    }

};

// Update Marks & Feedback
const gradeSubmission = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            marks,
            feedback
        } = req.body;

        const submission = await getSubmissionById(id);

        if (!submission) {
            return res.status(404).json({
                success: false,
                message: "Submission not found"
            });
        }

        const updatedSubmission = await updateSubmissionMarks(
            id,
            marks,
            feedback
        );

        res.json({
            success: true,
            message: "Submission graded successfully",
            submission: updatedSubmission
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update submission"
        });

    }

};

// Delete Submission
const removeSubmission = async (req, res) => {

    try {

        const { id } = req.params;

        const submission = await getSubmissionById(id);

        if (!submission) {
            return res.status(404).json({
                success: false,
                message: "Submission not found"
            });
        }

        await deleteSubmission(id);

        res.json({
            success: true,
            message: "Submission deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete submission"
        });

    }

};

module.exports = {
    addSubmission,
    fetchMySubmissions,
    fetchSubmissionsByAssignment,
    gradeSubmission,
    removeSubmission
};