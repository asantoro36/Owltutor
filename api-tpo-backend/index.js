const express = require('express');
const bodyParser = require('body-parser');
const {Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api-tpo',
    password: 'testing',
    port: 5432,
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/auth/login', async (req, res) => {
    const {email, password} = req.body;

    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const result = await pool.query(query, [email, password]);

    if (result.rows.length > 0) {
        res.json({ status: 'success', message: 'Inicio de sesión exitoso', user: { email } });
    } else {
        res.status(401).json({ status: 'error', message: 'Credenciales incorrectas' });
    }
});
app.post('/users', async (req, res) => {
    try {
        const {
            name,
            surname,
            mail,
            phone,
            password,
            title,
            experience,
            photoUrl,
        } = req.body;

        const query = `
      INSERT INTO users (name, surname, email, phone, pass, title, experience, photoUrl)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id;`;

        const result = await pool.query(query, [name, surname, mail, phone, password, title, experience, photoUrl]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
