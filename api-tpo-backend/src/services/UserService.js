const serviceRepository = require("../repository/ServiceRepository");
const contactRepository = require("../repository/ContactRepository");
const commentsRepository = require("../repository/CommentRepository");
const userRepository = require("../repository/UserRepository");

const getServices = async (userId) => {
    return await serviceRepository.getByUserId(userId)
}
const getContacts = async (userId) => {
    try {
        const services = await serviceRepository.getByUserId(userId);

        const contactsPromises = services.map(async (service) => {
            const contacts = await contactRepository.getAllByServiceId(service.id);

            const contactsWithServiceTitle = contacts.map(contact => ({
                ...contact,
                serviceTitle: service.title,
            }));

            return contactsWithServiceTitle || [];
        });

        const contacts = await Promise.all(contactsPromises)
        return contacts.flat();
    } catch (error) {
        console.error(`Error getting contacts: ${error.message}`);
        throw error;
    }
};


const getComments = async (userId) => {
    try {
        const services = await serviceRepository.getByUserId(userId);

        const commentsPromise = services.map(async (service) => {
            const comments = await commentsRepository.getAllByServiceId(service.id);
            return comments || []; // Si contacts es null o undefined, devuelve un arreglo vacío
        });

        const comments = await Promise.all(commentsPromise);

        return comments.flat();
    } catch (error) {
        console.error(`Error getting comments: ${error.message}`);
        throw error;
    }
}

const changeUserPassword = async (userData) => {
    const {newPassword, email} = userData;
    const user = await userRepository.getByEmail(email)
    await userRepository.updateUserPassword(user.id, newPassword)
}

module.exports = { getContacts, getServices, getComments, changeUserPassword };