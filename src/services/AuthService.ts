import axios from "axios";

export const login = (userData: any) => {
    return axios({
        method: "post",
        url: `http://localhost:8080/auth/login`,
        data: JSON.stringify(userData),
        headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'},
    }).then((response) => response);
};

export const sendCode = (userData: any) => {
    return axios({
        method: "post",
        url: `http://localhost:8080/auth/recover`,
        data: JSON.stringify(userData),
        headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'},
    }).then((response) => response.data);
}

export const changePassword = (userData: any) => {
    return axios({
        method: "post",
        url: `http://localhost:8080/auth/changePassword`,
        data: JSON.stringify(userData),
        headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'},
    }).then((response) => response.data);
}