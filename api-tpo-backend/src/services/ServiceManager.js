const {getAll} = require("../repository/ServiceRepository");
const commentRepository = require("../repository/CommentRepository");
const contactRepository = require("../repository/ContactRepository");
const categoryRepository = require("../repository/CategoryRepository");
const userRepository = require("../repository/UserRepository");

const getAllServices = async () => {

    const services = await getAll();
    return await Promise.all(
        services.map(async (service) => {
            const comments = await commentRepository.getAllByServiceId(service.id);
            const contacts = await contactRepository.getAllByServiceId(service.id);
            const category = await categoryRepository.getById(service.category);
            const user = await userRepository.getById(service.responsibleid)
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
        })
    );
}

module.exports = { getAllServices };