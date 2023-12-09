import {Service} from "../entities/Service";
import {
    addNewComment,
    createService,
    getAllServices,
    getServiceById,
    putService,
    remove, updateCommentStatus
} from "../services/ServiceGateway";
import {getComments, getUserServicesById} from "../services/UserService";
import {IComment} from "../entities/Comment";

export const saveService = (service: Service) => {
    createService(service, localStorage.getItem('token')!!)
}

export const getServices = async () => {
    return await getAllServices();
}

export const getUserServices = async (): Promise<any> => {

    const token = localStorage.getItem('token')!!
    const userData = JSON.parse(localStorage.getItem(token)!!)
    return await getUserServicesById(token, userData.id);
}

export const getUserComments = async (): Promise<any[]> => {

    const token = localStorage.getItem('token')!!
    const userData = JSON.parse(localStorage.getItem(token)!!)

    return await getComments(token, userData.id);
}

export const updateService = (service: Service) => {
    putService(service, localStorage.getItem('token')!!)
}

export const addComment = async (message: string, serviceId: string) => {
    const token = localStorage.getItem('token')!!
    let userData
    if(token) {
        userData = JSON.parse(localStorage.getItem(token)!!)
    }
    await addNewComment({message, userId: userData ? userData.id : null, serviceId})
}

export const makeUpdate = async (commentId: string, newStatus: string) => {
    const token = localStorage.getItem('token')!!
    if(token) {
        await updateCommentStatus(commentId, newStatus, token)
    }

}


export const removeService = (serviceId: number) => {
    remove(serviceId, localStorage.getItem('token')!!)
}

export const getService = async (serviceId: string) => {
    return await getServiceById(serviceId)
}