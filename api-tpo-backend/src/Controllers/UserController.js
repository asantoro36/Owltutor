const userRepository = require("../repository/UserRepository");
const jwt = require("jsonwebtoken");

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

module.exports = { getUser, createUser };