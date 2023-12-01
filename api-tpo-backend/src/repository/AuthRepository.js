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

const getRecoverPassword = async (email) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'SELECT "recoverToken" FROM recover WHERE email = $1 ORDER BY id DESC LIMIT 1',
            [email]
        );
        client.release();
        return result.rows[0].recoverToken;
    } catch (error) {
        console.error('Error al obtener token:', error);
        throw error;
    }
}


module.exports = { saveRecoverPassword, getRecoverPassword };