const {
    createAssignment,
    getAssignmentsByCourse,
    getAssignmentById,
    updateAssignment,
    deleteAssignment
} = require("../models/assignmentModel");

// Create Assignment
const addAssignment = async (req, res) => {

    try {

        const {
            course_id,
            title,
            description,
            due_date,
            max_marks
        } = req.body;

        if (!course_id || !title) {
            return res.status(400).json({
                success: false,
                message: "course_id and title are required"
            });
        }

        const assignment = await createAssignment(
            course_id,
            title,
            description,
            due_date,
            max_marks
        );

        res.status(201).json({
            success: true,
            message: "Assignment created successfully",
            assignment
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create assignment"
        });

    }

};

// Get Assignments By Course
const fetchAssignmentsByCourse = async (req, res) => {

    try {

        const { courseId } = req.params;

        const assignments = await getAssignmentsByCourse(courseId);

        res.json({
            success: true,
            total: assignments.length,
            assignments
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch assignments"
        });

    }

};

// Get Assignment By ID
const fetchAssignmentById = async (req, res) => {

    try {

        const { id } = req.params;

        const assignment = await getAssignmentById(id);

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: "Assignment not found"
            });
        }

        res.json({
            success: true,
            assignment
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch assignment"
        });

    }

};

// Update Assignment
const editAssignment = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            description,
            due_date,
            max_marks
        } = req.body;

        const existingAssignment = await getAssignmentById(id);

        if (!existingAssignment) {
            return res.status(404).json({
                success: false,
                message: "Assignment not found"
            });
        }

        const assignment = await updateAssignment(
            id,
            title,
            description,
            due_date,
            max_marks
        );

        res.json({
            success: true,
            message: "Assignment updated successfully",
            assignment
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update assignment"
        });

    }

};

// Delete Assignment
const removeAssignment = async (req, res) => {

    try {

        const { id } = req.params;

        const existingAssignment = await getAssignmentById(id);

        if (!existingAssignment) {
            return res.status(404).json({
                success: false,
                message: "Assignment not found"
            });
        }

        await deleteAssignment(id);

        res.json({
            success: true,
            message: "Assignment deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete assignment"
        });

    }

};

module.exports = {
    addAssignment,
    fetchAssignmentsByCourse,
    fetchAssignmentById,
    editAssignment,
    removeAssignment
};