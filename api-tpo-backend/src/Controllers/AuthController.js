const {Pool } = require('pg');
const {getByEmail} = require("../repository/UserRepository");
const jwt = require("jsonwebtoken");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api-tpo',
    password: 'testing',
    port: 5432,
});

const authUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await getByEmail(email);
    if (!user || user.pass !== password) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const payload = { userId: user.id, email: email };
    const secretKey = 'SuperSecret';
    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secretKey, options);

    res.json({ access_token: token });
}

const createAccount = async (req, res) => {

    const {email, password} = req.body;

    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const result = await pool.query(query, [email, password]);

    if (result.rows.length > 0) {
        res.json({ status: 'success', message: 'Inicio de sesión exitoso', user: { email } });
    } else {
        res.status(401).json({ status: 'error', message: 'Credenciales incorrectas' });
    }
}

module.exports = { authUser, createAccount };