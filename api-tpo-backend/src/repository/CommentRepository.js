const {Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api-tpo',
    password: 'testing',
    port: 5432,
});

const getAllByServiceId = async (serviceId) => {
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM comments WHERE serviceId=$1';
        const result = await client.query(query, [serviceId]);
        client.release();
        return result.rows.length > 0 ? result.rows : [];
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        return []
    }
}

module.exports = { getAllByServiceId };