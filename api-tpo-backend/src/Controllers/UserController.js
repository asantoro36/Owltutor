const userRepository = require("../repository/UserRepository");
const jwt = require("jsonwebtoken");
const userService = require("../services/UserService");

const createUser = async (req, res) => {
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

        const result = await userRepository.save({name, surname, mail, phone, password, title, experience, photoUrl});
        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
}

const getUser = async (req, res) => {
    const token = req.headers.authorization;
    try {

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const decodedToken = jwt.verify(token, 'SuperSecret');

        const user = await userRepository.getById(decodedToken.userId)
        if (user) {
            const userWithoutPassword = { ...user, pass: undefined };
            res.status(201).json(userWithoutPassword);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }

    } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
}

const getUserServices = async (req, res) => {
    const token = req.headers.authorization;
    const userId = req.params.userId;
    try {
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const decodedToken = jwt.verify(token, 'SuperSecret');
        if(decodedToken.userId.toString() !== userId) return res.status(401).json({ error: 'Unauthorized' });

        const services = await userService.getServices(userId)
        res.status(200).json(services);


    } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
}

const getUserContacts = async (req, res) => {
    const token = req.headers.authorization;
    const userId = req.params.userId;
    console.log(userId)
    try {
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const decodedToken = jwt.verify(token, 'SuperSecret');
        if(decodedToken.userId.toString() !== userId) return res.status(401).json({ error: 'Unauthorized' });

        const contacts = await userService.getContacts(userId)
        res.status(200).json(contacts);

    } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }

}

const getUserComments = async (req, res) => {
    const token = req.headers.authorization;
    const userId = req.params.userId;
    try {
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const decodedToken = jwt.verify(token, 'SuperSecret');
        if(decodedToken.userId.toString() !== userId) return res.status(401).json({ error: 'Unauthorized' });

        const comments = await userService.getComments(userId)
        res.status(200).json(comments);

    } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
}

module.exports = { getUser, createUser, getUserServices, getUserContacts, getUserComments };