import axios from "axios";


export const post = (userData: any) => {
    return axios({
        method: "post",
        url: `http://127.0.0.1:8080/users`,
        data: JSON.stringify(userData),
        headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'},
    }).then((response) => response.data)
        .catch((error) => {
            console.error("Error en la solicitud:", error);
            throw error; // Puedes lanzar el error nuevamente para que otros puedan manejarlo también.
        });;
};
