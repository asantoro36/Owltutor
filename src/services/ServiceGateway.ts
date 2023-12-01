import axios from "axios";

export const getAllServices = () => {
    return axios({
        method: "get",
        url: `http://localhost:8080/services`,
        headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'},
    }).then((response) => response.data);
};
