const {getAll} = require("../repository/ServiceRepository");
const commentRepository = require("../repository/CommentRepository");
const contactRepository = require("../repository/ContactRepository");
const categoryRepository = require("../repository/CategoryRepository");
const userRepository = require("../repository/UserRepository");

const getAllServices = async () => {

    try {
    const services = await getAll();
    const allServices = await Promise.all(
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
    return allServices
    } catch (error) {
        console.error(`Error retrieving services: ${error.message}`);
        throw error;
    }
}

module.exports = { getAllServices };