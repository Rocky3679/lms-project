const pool = require("../config/db");

const createCourse = async (
    title,
    description,
    category,
    duration,
    price,
    thumbnail,
    instructor_id
) => {

    const result = await pool.query(
        `
        INSERT INTO courses
        (
            title,
            description,
            category,
            duration,
            price,
            thumbnail,
            instructor_id
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *;
        `,
        [
            title,
            description,
            category,
            duration,
            price,
            thumbnail,
            instructor_id
        ]
    );

    return result.rows[0];
};

const getAllCourses = async () => {

    const result = await pool.query(`
        SELECT
            c.*,
            u.full_name AS instructor_name
        FROM courses c
        LEFT JOIN users u
        ON c.instructor_id = u.id
        ORDER BY c.id DESC
    `);

    return result.rows;
};

const getCourseById = async (id) => {

    const result = await pool.query(
        `
        SELECT
            c.*,
            u.full_name AS instructor_name
        FROM courses c
        LEFT JOIN users u
        ON c.instructor_id = u.id
        WHERE c.id = $1
        `,
        [id]
    );

    return result.rows[0];
};

const updateCourse = async (
    id,
    title,
    description,
    category,
    duration,
    price,
    thumbnail
) => {

    const result = await pool.query(
        `
        UPDATE courses
        SET
            title=$1,
            description=$2,
            category=$3,
            duration=$4,
            price=$5,
            thumbnail=$6,
            updated_at=NOW()
        WHERE id=$7
        RETURNING *;
        `,
        [
            title,
            description,
            category,
            duration,
            price,
            thumbnail,
            id
        ]
    );

    return result.rows[0];
};

const deleteCourse = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM courses
        WHERE id=$1
        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
};