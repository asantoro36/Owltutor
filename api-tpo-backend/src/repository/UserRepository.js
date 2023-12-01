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

module.exports = { save, getById};