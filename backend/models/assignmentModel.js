const pool = require("../config/db");

const createAssignment = async (
    course_id,
    title,
    description,
    due_date,
    max_marks
) => {

    const result = await pool.query(
        `
        INSERT INTO assignments
        (
            course_id,
            title,
            description,
            due_date,
            max_marks
        )
        VALUES($1,$2,$3,$4,$5)
        RETURNING *;
        `,
        [
            course_id,
            title,
            description,
            due_date,
            max_marks
        ]
    );

    return result.rows[0];

};

const getAssignmentsByCourse = async (course_id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM assignments
        WHERE course_id = $1
        ORDER BY created_at DESC;
        `,
        [course_id]
    );

    return result.rows;

};

const getAssignmentById = async (id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM assignments
        WHERE id = $1;
        `,
        [id]
    );

    return result.rows[0];

};

const updateAssignment = async (
    id,
    title,
    description,
    due_date,
    max_marks
) => {

    const result = await pool.query(
        `
        UPDATE assignments
        SET
            title=$1,
            description=$2,
            due_date=$3,
            max_marks=$4,
            updated_at=NOW()
        WHERE id=$5
        RETURNING *;
        `,
        [
            title,
            description,
            due_date,
            max_marks,
            id
        ]
    );

    return result.rows[0];

};

const deleteAssignment = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM assignments
        WHERE id=$1
        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];

};

module.exports = {
    createAssignment,
    getAssignmentsByCourse,
    getAssignmentById,
    updateAssignment,
    deleteAssignment
};