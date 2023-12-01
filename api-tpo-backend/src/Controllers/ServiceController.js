const {getAllServices, addContact} = require("../services/ServiceManager");
const serviceManager = require("../services/ServiceManager");
const getServices = async (req, res) => {
    try {
        const result = await getAllServices();

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

const getService = async (req, res) => {
    const serviceId = req.params.serviceId

    try {
        const result = await serviceManager.getService(serviceId);

        if (result === undefined) {
            res.status(500)
        } else{

            res.status(201).json(result);
        }

    } catch (error) {
        console.error('fallo al obtener servicio:', error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
}

const contact = async (req, res) => {
    const serviceId = req.params.id;
    const {
        name,
        phone,
        email,
        time,
        message,
        userId
    } = req.body;

    try {
        const result = await addContact({serviceId, name, phone, email, time, message, userId});

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

module.exports = { getServices, contact, getService };