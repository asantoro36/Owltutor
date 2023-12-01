const {Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api-tpo',
    password: 'testing',
    port: 5432,
});

const save = async (contact) => {
    const query = `
      INSERT INTO contacts ("serviceId", "name", phone, email, "time", message, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id
    `;

    return await pool.query(query, [contact.serviceId, contact.name, contact.phone, contact.email, contact.time, contact.message, contact.status]);
}

const getAllByServiceId = async (serviceId) => {
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM contacts WHERE "serviceId" = $1';
        const result = await client.query(query, [serviceId]);
        client.release();
        return result.rows.length > 0 ? result.rows : [];
    } catch (error) {
        console.error('Error al obtener contactos:', error);
        return []
    }
}

module.exports = { save, getAllByServiceId };