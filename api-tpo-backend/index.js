const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;

    // lógica de autenticación

    res.json({ status: 'success', message: 'Inicio de sesión exitoso', user: { email } });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
