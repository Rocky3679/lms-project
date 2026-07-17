const pool = require("../config/db");

const createLesson = async (
    course_id,
    title,
    description,
    video_url,
    lesson_order,
    duration
) => {

    const result = await pool.query(
        `
        INSERT INTO lessons
        (
            course_id,
            title,
            description,
            video_url,
            lesson_order,
            duration
        )
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING *;
        `,
        [
            course_id,
            title,
            description,
            video_url,
            lesson_order,
            duration
        ]
    );

    return result.rows[0];

};

const getLessonsByCourse = async (courseId) => {

    const result = await pool.query(
        `
        SELECT *
        FROM lessons
        WHERE course_id=$1
        ORDER BY lesson_order ASC;
        `,
        [courseId]
    );

    return result.rows;

};

const getLessonById = async (id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM lessons
        WHERE id=$1;
        `,
        [id]
    );

    return result.rows[0];

};

const updateLesson = async (
    id,
    title,
    description,
    video_url,
    lesson_order,
    duration
) => {

    const result = await pool.query(
        `
        UPDATE lessons
        SET
            title=$1,
            description=$2,
            video_url=$3,
            lesson_order=$4,
            duration=$5,
            updated_at=NOW()
        WHERE id=$6
        RETURNING *;
        `,
        [
            title,
            description,
            video_url,
            lesson_order,
            duration,
            id
        ]
    );

    return result.rows[0];

};

const deleteLesson = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM lessons
        WHERE id=$1
        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];

};

module.exports = {
    createLesson,
    getLessonsByCourse,
    getLessonById,
    updateLesson,
    deleteLesson
};