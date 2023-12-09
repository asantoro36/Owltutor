const {addComment} = require("../services/ServiceManager");
const {updateStatus} = require("../repository/CommentRepository");
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

const updateCommentStatus = async (req, res) => {
    const {status} = req.body
    const commentId = req.params.id

    try {
        const result = await updateStatus(commentId, status)
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
module.exports = { createComment, updateCommentStatus };