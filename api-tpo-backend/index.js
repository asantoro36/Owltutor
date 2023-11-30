const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {createUser} = require("./src/Controllers/UserController");
const {authUser} = require("./src/Controllers/AuthController");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/auth/login', authUser);
app.post('/users', createUser);


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
