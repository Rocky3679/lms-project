const pool = require("../config/db");

const createQuiz = async (
    course_id,
    title,
    description,
    total_marks,
    time_limit
) => {

    const result = await pool.query(
        `
        INSERT INTO quizzes
        (
            course_id,
            title,
            description,
            total_marks,
            time_limit
        )
        VALUES($1,$2,$3,$4,$5)
        RETURNING *;
        `,
        [
            course_id,
            title,
            description,
            total_marks,
            time_limit
        ]
    );

    return result.rows[0];

};

const getQuizzesByCourse = async (course_id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM quizzes
        WHERE course_id = $1
        ORDER BY created_at DESC;
        `,
        [course_id]
    );

    return result.rows;

};

const getQuizById = async (id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM quizzes
        WHERE id = $1;
        `,
        [id]
    );

    return result.rows[0];

};

const updateQuiz = async (
    id,
    title,
    description,
    total_marks,
    time_limit
) => {

    const result = await pool.query(
        `
        UPDATE quizzes
        SET
            title = $1,
            description = $2,
            total_marks = $3,
            time_limit = $4,
            updated_at = NOW()
        WHERE id = $5
        RETURNING *;
        `,
        [
            title,
            description,
            total_marks,
            time_limit,
            id
        ]
    );

    return result.rows[0];

};

const deleteQuiz = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM quizzes
        WHERE id = $1
        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];

};

module.exports = {
    createQuiz,
    getQuizzesByCourse,
    getQuizById,
    updateQuiz,
    deleteQuiz
};