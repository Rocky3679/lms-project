const pool = require("../config/db");

const createSubmission = async (
    assignment_id,
    student_id,
    submission_text,
    file_url
) => {

    const result = await pool.query(
        `
        INSERT INTO submissions
        (
            assignment_id,
            student_id,
            submission_text,
            file_url
        )
        VALUES ($1,$2,$3,$4)
        RETURNING *;
        `,
        [
            assignment_id,
            student_id,
            submission_text,
            file_url
        ]
    );

    return result.rows[0];

};

const checkSubmissionExists = async (
    assignment_id,
    student_id
) => {

    const result = await pool.query(
        `
        SELECT *
        FROM submissions
        WHERE assignment_id=$1
        AND student_id=$2;
        `,
        [
            assignment_id,
            student_id
        ]
    );

    return result.rows[0];

};

const getMySubmissions = async (student_id) => {

    const result = await pool.query(
        `
        SELECT
            s.*,
            a.title AS assignment_title,
            c.title AS course_title
        FROM submissions s
        JOIN assignments a
            ON s.assignment_id = a.id
        JOIN courses c
            ON a.course_id = c.id
        WHERE s.student_id = $1
        ORDER BY s.submitted_at DESC;
        `,
        [student_id]
    );

    return result.rows;

};

const getSubmissionsByAssignment = async (assignment_id) => {

    const result = await pool.query(
        `
        SELECT
            s.*,
            u.full_name,
            u.email
        FROM submissions s
        JOIN users u
            ON s.student_id = u.id
        WHERE s.assignment_id = $1
        ORDER BY s.submitted_at DESC;
        `,
        [assignment_id]
    );

    return result.rows;

};

const getSubmissionById = async (id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM submissions
        WHERE id = $1;
        `,
        [id]
    );

    return result.rows[0];

};

const updateSubmissionMarks = async (
    id,
    marks,
    feedback
) => {

    const result = await pool.query(
        `
        UPDATE submissions
        SET
            marks = $1,
            feedback = $2,
            updated_at = NOW()
        WHERE id = $3
        RETURNING *;
        `,
        [
            marks,
            feedback,
            id
        ]
    );

    return result.rows[0];

};

const deleteSubmission = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM submissions
        WHERE id = $1
        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];

};

module.exports = {
    createSubmission,
    checkSubmissionExists,
    getMySubmissions,
    getSubmissionsByAssignment,
    getSubmissionById,
    updateSubmissionMarks,
    deleteSubmission
};