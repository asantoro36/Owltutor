const {Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api-tpo',
    password: 'testing',
    port: 5432,
});

const getAll = async () => {
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM services';
        const result = await client.query(query);
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        throw error;
    }
}

module.exports = { getAll };