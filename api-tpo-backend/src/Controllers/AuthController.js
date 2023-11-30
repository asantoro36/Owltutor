const {Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api-tpo',
    password: 'testing',
    port: 5432,
});

const authUser = async (req, res) => {

    const {email, password} = req.body;

    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const result = await pool.query(query, [email, password]);

    if (result.rows.length > 0) {
        res.json({ status: 'success', message: 'Inicio de sesión exitoso', user: { email } });
    } else {
        res.status(401).json({ status: 'error', message: 'Credenciales incorrectas' });
    }
}

module.exports = { authUser };