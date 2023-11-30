const {getAllServices} = require("../services/ServiceManager");
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

module.exports = { getServices };