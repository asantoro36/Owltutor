const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {createUser, getUser, getUserServices, getUserContacts, getUserComments} = require("./src/Controllers/UserController");
const {authUser, recoverPassword, changePassword} = require("./src/Controllers/AuthController");
const {getServices, contact, getService} = require("./src/Controllers/ServiceController");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/auth/signup', createUser);
app.post('/auth/login', authUser);
app.post('/auth/recover', recoverPassword);
app.post('/auth/changePassword', changePassword)

app.get('/users', getUser);
app.get('/users/:userId/services', getUserServices)
app.get('/users/:userId/contacts', getUserContacts)
app.get('/users/:userId/comments', getUserComments)

app.get('/services', getServices)
app.get('/services/:serviceId', getService)
app.post('/services/:id/contacts', contact)


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
