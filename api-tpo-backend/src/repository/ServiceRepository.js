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

const getByServiceId = async (serviceId) => {
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM services WHERE id = $1';
        const result = await client.query(query, [serviceId]);

        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        throw error;
    }
}

const getByUserId = async (userId) => {
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM services WHERE "responsibleId" = $1';
        const result = await client.query(query, [userId]);
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        throw error;
    }
}

const insertService = async (serviceInfo) => {
    const {title, category, description, type, frequency, rating, responsibleId, duration, days, cost, isPublished} = serviceInfo
    try {
        const client = await pool.connect();
        const result = await client.query(`
            INSERT INTO services (title, category, description, "type", frequency, rating, "responsibleId", duration, days, "cost", "isPublished")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING id;
        `, [title, category, description, type, frequency, rating, responsibleId, duration, days, cost, isPublished]);
        client.release();
        return result[0]; // Devuelve el primer elemento del resultado, que es el nuevo servicio insertado
    } catch (error) {
        console.error('Error al insertar servicio:', error.message);
        throw error; // Re-lanzar el error para manejarlo en el nivel superior si es necesario
    }
}

const updateService = async ( updatedService) => {
    try {
        const client = await pool.connect();
        const { serviceId, title, category, description, type, frequency, rating, responsibleId, duration, days, cost, isPublished } = updatedService;
        const query = `
          UPDATE services
          SET title = $2, category = $3, description = $4, type = $5, frequency = $6,
              rating = $7, "responsibleId" = $8, duration = $9, days = $10, cost = $11, "isPublished" = $12
          WHERE id = $1
        `;
        const result = await client.query(query, [serviceId, title, category, description, type, frequency, rating, responsibleId, duration, days, cost, isPublished]);

        if (result.rowCount === 1) {
            console.log(`El servicio con ID ${serviceId} fue actualizado exitosamente.`);
        } else {
            console.error(`No se encontró el servicio con ID ${serviceId}.`);
        }
        client.release();
        return result
    } catch (error) {
        console.error('Error al actualizar el servicio:', error.message);
    }
};

const deleteById = async (serviceId) => {
    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM services WHERE id = $1 RETURNING *', [serviceId]);
        client.release();
        return result? result.rows[0] : []
    } catch (error) {
        console.error('Error al eliminar:', error);
        return []
    }
}

module.exports = { getAll, getByUserId, getByServiceId, insertService, updateService, deleteById };