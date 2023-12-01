import axios from "axios";

export const updateStatus = (serviceProps: any, token: string) => {
    return axios({
        method: "put",
        url: `http://localhost:8080/contacts/${serviceProps.id}`,
        data: JSON.stringify(serviceProps),
        headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authoriation': token},
    }).then((response) => response.data);
};