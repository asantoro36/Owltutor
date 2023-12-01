const {Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api-tpo',
    password: 'testing',
    port: 5432,
});

const saveRecoverPassword = async (userData) => {
    const {
        email,
        recoverToken,
        userId,
    } = userData;
    try {
        const client = await pool.connect();
        const query = `
      INSERT INTO recover (email, "recoverToken", "userId")
      VALUES ($1, $2, $3)
      RETURNING id;`;
        client.query(query, [email, recoverToken, userId]);
        client.release();
    } catch (error) {
        console.error('Error al guardar token:', error);
        throw error;
    }
}


module.exports = { saveRecoverPassword };