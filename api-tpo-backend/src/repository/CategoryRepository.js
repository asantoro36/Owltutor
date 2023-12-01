const {Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api-tpo',
    password: 'testing',
    port: 5432,
});

const getById = async (categoryId) => {
    try {
        const client = await pool.connect();
        const query = 'SELECT title FROM categories WHERE id=$1';
        const result = await client.query(query, [categoryId]);
        client.release();
        return result.rows[0].title;
    } catch (error) {
        return "General";
    }
}

module.exports = { getById };