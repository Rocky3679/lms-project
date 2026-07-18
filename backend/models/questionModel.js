const pool = require("../config/db");

const createQuestion = async (
    quiz_id,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
    marks
) => {

    const result = await pool.query(
        `
        INSERT INTO quiz_questions
        (
            quiz_id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            marks
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING *;
        `,
        [
            quiz_id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            marks
        ]
    );

    return result.rows[0];

};

const getQuestionsByQuiz = async (quiz_id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM quiz_questions
        WHERE quiz_id = $1
        ORDER BY id ASC;
        `,
        [quiz_id]
    );

    return result.rows;

};

const getQuestionById = async (id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM quiz_questions
        WHERE id = $1;
        `,
        [id]
    );

    return result.rows[0];

};

const updateQuestion = async (
    id,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
    marks
) => {

    const result = await pool.query(
        `
        UPDATE quiz_questions
        SET
            question=$1,
            option_a=$2,
            option_b=$3,
            option_c=$4,
            option_d=$5,
            correct_option=$6,
            marks=$7,
            updated_at=NOW()
        WHERE id=$8
        RETURNING *;
        `,
        [
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            marks,
            id
        ]
    );

    return result.rows[0];

};

const deleteQuestion = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM quiz_questions
        WHERE id=$1
        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];

};

module.exports = {
    createQuestion,
    getQuestionsByQuiz,
    getQuestionById,
    updateQuestion,
    deleteQuestion
};