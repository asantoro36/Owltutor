const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {createUser, getUser} = require("./src/Controllers/UserController");
const {authUser} = require("./src/Controllers/AuthController");
const {getServices, contact} = require("./src/Controllers/ServiceController");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/auth/signup', authUser);
app.post('/auth/login', authUser);

app.post('/users', createUser);
app.get('/users', getUser);

app.get('/services', getServices)
app.post('/services/:id/contacts', contact)


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
