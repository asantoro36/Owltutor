import axios from "axios";

export const post = (userData: any) => {
    return axios({
        method: "post",
        url: `http://localhost:8080/users`,
        data: JSON.stringify(userData),
        headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'},
    }).then((response) => response.data);
};
