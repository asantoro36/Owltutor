const {getAllServices, addContact} = require("../services/ServiceManager");
const serviceManager = require("../services/ServiceManager");
const {isValidAuth, isValidToken} = require("../services/Authenticator");
const userService = require("../services/UserService");
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
            res.status(404)
        } else{
            res.status(201).json(result);
        }
    } catch (error) {
        console.error('fallo al obtener servicio:', error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
}

const createService = async (req, res) => {
    const token = req.headers.authorization;
    try {
        if(isValidToken(token)) {
            const result = await serviceManager.saveService(req.body)
            if (result) {
                return res.status(400)
            } else{
                return res.status(201).json(result);
            }
        } else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        console.error('fallo al crear servicio:', error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
}

const updateService = async (req, res) => {
    const serviceId = req.params.serviceId
    const updatedServiceData = { ...req.body, serviceId };
    const token = req.headers.authorization;
    try {
        if(isValidToken(token)) {
            const result = await serviceManager.update(updatedServiceData)
            if (result) {
                res.status(200).json({message: "OK"});
            } else{
                res.status(404).json({message: "NOT FOUND"})
            }
        } else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        console.error('fallo al crear servicio:', error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
}

const deleteService = async (req, res) => {
    const serviceId = req.params.serviceId
    const token = req.headers.authorization;

    try {
        if (isValidToken(token)) {
            serviceManager.remove(serviceId)
            res.status(200).json({message: "OK"});
        } else {
            return res.status(401).json({ error: 'Unauthorized' });
        }


    } catch (error) {
        console.error('fallo al crear servicio:', error);
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

module.exports = { getServices, contact, getService, createService, updateService, deleteService };