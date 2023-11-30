const userRepository = require("../repository/UserRepository");


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

module.exports = { createUser };