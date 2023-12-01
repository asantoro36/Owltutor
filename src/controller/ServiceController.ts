import {Service} from "../entities/Service";
import {createService, getAllServices, getServiceById, putService, remove} from "../services/ServiceGateway";
import {getComments, getUserServicesById} from "../services/UserService";

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


export const removeService = (serviceId: number) => {
    remove(serviceId, localStorage.getItem('token')!!)
}

export const getService = async (serviceId: string) => {
    return await getServiceById(serviceId)
}