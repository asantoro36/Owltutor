const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {createUser, getUser, getUserServices, getUserContacts, getUserComments} = require("./src/Controllers/UserController");
const {authUser, recoverPassword} = require("./src/Controllers/AuthController");
const {getServices, contact} = require("./src/Controllers/ServiceController");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/auth/signup', authUser);
app.post('/auth/login', authUser);
app.post('/auth/recover', recoverPassword);

app.post('/users', createUser);
app.get('/users', getUser);
app.get('/users/:userId/services', getUserServices)
app.get('/users/:userId/contacts', getUserContacts)
app.get('/users/:userId/comments', getUserComments)

app.get('/services', getServices)
app.post('/services/:id/contacts', contact)


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
