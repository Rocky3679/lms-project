const pool = require("../config/db");

const createUser = async (full_name, email, password, role) => {
    const query = `
        INSERT INTO users (full_name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, full_name, email, role, created_at;
    `;

    const values = [full_name, email, password, role];

    const result = await pool.query(query, values);

    return result.rows[0];
};

const findUserByEmail = async (email) => {
    const query = `
        SELECT * FROM users
        WHERE email = $1;
    `;

    const result = await pool.query(query, [email]);

    return result.rows[0];
};

module.exports = {
    createUser,
    findUserByEmail
};