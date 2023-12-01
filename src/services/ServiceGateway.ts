import axios from "axios";
import {IContact} from "../entities/Contact";

export const getAllServices = () => {
    return axios({
        method: "get",
        url: `http://localhost:8080/services`,
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