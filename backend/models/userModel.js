const pool = require("../config/db");

// Create User
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

// Find User by Email
const findUserByEmail = async (email) => {

    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return result.rows[0];
};

// Get All Users
const getAllUsers = async () => {

    const result = await pool.query(`
        SELECT
            id,
            full_name,
            email,
            role,
            created_at
        FROM users
        ORDER BY id ASC
    `);

    return result.rows;
};

// Update User Role
const updateUserRole = async (id, role) => {

    const result = await pool.query(
        `UPDATE users
         SET role=$1
         WHERE id=$2
         RETURNING id, full_name, email, role`,
        [role, id]
    );

    return result.rows[0];
};

module.exports = {
    createUser,
    findUserByEmail,
    getAllUsers,
    updateUserRole
};