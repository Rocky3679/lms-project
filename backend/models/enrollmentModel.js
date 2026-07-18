const pool = require("../config/db");

const enrollStudent = async (student_id, course_id) => {

    const result = await pool.query(
        `
        INSERT INTO enrollments
        (
            student_id,
            course_id
        )
        VALUES($1,$2)
        RETURNING *;
        `,
        [student_id, course_id]
    );

    return result.rows[0];

};

const getStudentEnrollments = async (student_id) => {

    const result = await pool.query(
        `
        SELECT
            e.id,
            e.enrolled_at,
            c.id AS course_id,
            c.title,
            c.category,
            c.duration,
            c.price,
            u.full_name AS instructor_name
        FROM enrollments e
        JOIN courses c
            ON e.course_id = c.id
        LEFT JOIN users u
            ON c.instructor_id = u.id
        WHERE e.student_id = $1
        ORDER BY e.enrolled_at DESC;
        `,
        [student_id]
    );

    return result.rows;

};

const getCourseEnrollments = async (course_id) => {

    const result = await pool.query(
        `
        SELECT
            e.id,
            e.enrolled_at,
            u.id AS student_id,
            u.full_name,
            u.email
        FROM enrollments e
        JOIN users u
            ON e.student_id = u.id
        WHERE e.course_id = $1
        ORDER BY e.enrolled_at DESC;
        `,
        [course_id]
    );

    return result.rows;

};

const deleteEnrollment = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM enrollments
        WHERE id = $1
        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];

};

module.exports = {
    enrollStudent,
    getStudentEnrollments,
    getCourseEnrollments,
    deleteEnrollment
};