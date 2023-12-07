const {addComment} = require("../services/ServiceManager");
const createComment = async (req, res) => {
    const serviceId = req.params.serviceId;
    const {
        message,
        userId
    } = req.body;

    try {
        const result = await addComment({ userId, serviceId, message });
        if (result === undefined) {
            res.status(500)
        } else{
            res.status(201).json(result);
        }
    } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
}

module.exports = { createComment };