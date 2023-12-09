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

const save = async (comment) => {
    const query = `
      INSERT INTO comments ("serviceId", "text", "userId", date, status)
      VALUES ($1, $2, $3, $4, $5) RETURNING id
    `;
console.log(comment)
    return await pool.query(query, [comment.serviceId, comment.message, comment.userId, comment.date, comment.status]);
}

const updateStatus = async (commentId, newStatus) => {
    try {
        const client = await pool.connect();
        const result = await client.query('UPDATE "comments" SET status = $1 WHERE id = $2', [newStatus, commentId]);
        client.release();
        return result
    } catch (error) {
        console.error('Error al actualizar:', error);
        return []
    }
}


module.exports = { getAllByServiceId, deleteById, save, updateStatus };