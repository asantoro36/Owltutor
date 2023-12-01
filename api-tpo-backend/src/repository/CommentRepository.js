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
        const query = 'SELECT * FROM comments WHERE "serviceId" = $1';
        const result = await client.query(query, [serviceId]);
        client.release();
        return result.rows.length > 0 ? result.rows : [];
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        return []
    }
}

const deleteById = async (commentId) => {
    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM comments WHERE id = $1 RETURNING *', [commentId]);
        client.release();
        return result? result.rows[0] : []
    } catch (error) {
        console.error('Error al eliminar:', error);
        return []
    }
}


module.exports = { getAllByServiceId, deleteById };