const {updateStatus} = require("../repository/ContactRepository");

const updateContactStatus = async (req, res) => {
    const {status} = req.body
    const contactId = req.params.id

    try {
        const result = await updateStatus(contactId, status)
        if (result) {
            res.status(200).json({message: "OK"});
        } else{
            res.status(404).json({message: "NOT FOUND"})
        }
    } catch (error) {
        console.error('fallo al actualizar:', error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
}

module.exports = { updateContactStatus };