const {Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api-tpo',
    password: 'testing',
    port: 5432,
});

const save = async (user) => {
    const {
        name,
        surname,
        mail,
        phone,
        password,
        title,
        experience,
        photoUrl,
    } = user;
    const query = `
      INSERT INTO users (name, surname, email, phone, pass, title, experience, photoUrl)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id;`;

    return await pool.query(query, [name, surname, mail, phone, password, title, experience, photoUrl]);
}

const getById = async (userId) => {
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM users WHERE id=$1';
        const result = await client.query(query, [userId]);
        client.release();
        return result.rows[0];
    } catch (error) {
        return null
    }
}

const getByEmail = async (email) => {
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM users WHERE email=$1';
        const result = await client.query(query, [email]);
        client.release();
        return result.rows[0];
    } catch (error) {
        return null
    }
}

const updateUserPassword = async (userId, newPassword) => {
    try {
        const client = await pool.connect();
        await client.query('UPDATE users SET pass = $1 WHERE id = $2', [
            newPassword,
            userId,
        ]);
        client.release();
    } catch (error) {
        console.error(`Error en updateUserPassword: ${error.message}`);
        throw error;
    }
};

module.exports = { save, getById, getByEmail, updateUserPassword};