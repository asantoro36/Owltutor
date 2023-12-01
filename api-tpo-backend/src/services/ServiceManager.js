const {getAll, getByServiceId, insertService, updateService, deleteById} = require("../repository/ServiceRepository");
const commentRepository = require("../repository/CommentRepository");
const contactRepository = require("../repository/ContactRepository");
const categoryRepository = require("../repository/CategoryRepository");
const userRepository = require("../repository/UserRepository");
const Contact = require("../model/Contact");

const getAllServices = async () => {

    try {
    const services = await getAll();
    return await Promise.all(
        services.map(async (service) => {
            try {
                const [comments, contacts, category, user] = await Promise.all([
                    commentRepository.getAllByServiceId(service.id),
                    contactRepository.getAllByServiceId(service.id),
                    categoryRepository.getById(service.category),
                    userRepository.getById(service.responsibleId),
                ]);

                const responsible = user.name + " " + user.surname
                const responsibleExperience = user.experience
                const responsiblePhotoUrl = user.photoUrl
                const responsibleEmail = user.email
                return {
                    ...service,
                    comments,
                    contacts,
                    category,
                    responsible,
                    responsibleExperience,
                    responsiblePhotoUrl,
                    responsibleEmail
                };
            } catch (error) {
                console.error(`Error processing service ${service.id}: ${error.message}`);
                throw error; // Re-throw the error to propagate it
            }
        })
    );
    } catch (error) {
        console.error(`Error retrieving services: ${error.message}`);
        throw error;
    }
}

const getService = async (serviceId) => {
    try {
        const service = await getByServiceId(serviceId)
        const [comments, contacts, category, user] = await Promise.all([
            commentRepository.getAllByServiceId(service.id),
            contactRepository.getAllByServiceId(service.id),
            categoryRepository.getById(service.category),
            userRepository.getById(service.responsibleId),
        ]);
        const responsible = user.name + " " + user.surname
        const responsibleExperience = user.experience
        const responsiblePhotoUrl = user.photoUrl
        const responsibleEmail = user.email
        return {
            ...service,
            comments,
            contacts,
            category,
            responsible,
            responsibleExperience,
            responsiblePhotoUrl,
            responsibleEmail
        };
    } catch (error) {
        console.error(`Error retrieving services: ${error.message}`);
        throw error;
    }
}

const saveService = async (serviceInfo) => {
    return await insertService(serviceInfo)
}

const update = async (serviceInfo) => {
    return updateService(serviceInfo)
}

const addContact = async (contactInfo) => {
    const newContact = new Contact(
        null,
        contactInfo.serviceId,
        contactInfo.name,
        contactInfo.phone,
        contactInfo.email,
        'PENDING',
        contactInfo.time,
        contactInfo.message
    );
    const result = await contactRepository.save(newContact);
    return result.rows[0]
}

const remove = async (serviceId) => {
    const [comments, contacts] = await Promise.all([
        commentRepository.getAllByServiceId(serviceId),
        contactRepository.getAllByServiceId(serviceId),
    ]);

    const deleteComments = comments.map((comment) => commentRepository.deleteById(comment.id));
    const deleteContacts = contacts.map((contact) => contactRepository.deleteById(contact.id));

    await Promise.all([...deleteComments, ...deleteContacts]);

    return await deleteById(serviceId);
}


module.exports = { getAllServices, addContact, getService, saveService, update, remove };