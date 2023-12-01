import axios from "axios";
import {IContact} from "../entities/Contact";

export const createService = (serviceProps: any, token: string) => {
    return axios({
        method: "post",
        url: `http://localhost:8080/services`,
        data: JSON.stringify(serviceProps),
        headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        'Authoriation': token},
    }).then((response) => response.data);
};

export const putService = (serviceProps: any, token: string) => {
    return axios({
        method: "put",
        url: `http://localhost:8080/services/${serviceProps.id}`,
        data: JSON.stringify(serviceProps),
        headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        'Authoriation': token},
    }).then((response) => response.data);
};

export const remove = (serviceId: any, token: string) => {
    return axios({
        method: "delete",
        url: `http://localhost:8080/services/${serviceId}`,
        headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authoriation': token},
    }).then((response) => response.data);
};

export const getAllServices = () => {
    return axios({
        method: "get",
        url: `http://localhost:8080/services`,
        headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'},
    }).then((response) => response.data);
};

export const getServiceById = (serviceId: string) => {
    return axios({
        method: "get",
        url: `http://localhost:8080/services/${serviceId}`,
        headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'},
    }).then((response) => response.data);
};

interface ContactProps {
    name: string,
    phone: string,
    email: string,
    time: string,
    message: string,
    serviceId: string,
}
export const addNewContact = (props: ContactProps) => {
    const serviceId = props.serviceId
    return axios({
        method: "post",
        url: `http://localhost:8080/services/${props.serviceId}/contacts`,
        data: JSON.stringify(props),
        headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'},
    }).then((response) => response.data);
}