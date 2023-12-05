import {login} from "../services/AuthService";
import {getUser} from "../services/UserService";

export const validateAuthCode = (code: string) => {
    return code === "123ABC"
}

export const loginUser = async (formData: any) => {
    const response = await login(formData)

    if(response.status === 401) { throw new Error }
    if (response.status) {
       localStorage.setItem('token', response.data.access_token);
       const user = await getUser(response.data.access_token)
        localStorage.setItem(response.data.access_token, JSON.stringify(user))
    }
    return null;
};


export const LogoutUser = () => {
    const token = localStorage.getItem('token');
    localStorage.removeItem(token? token: '')
    localStorage.removeItem('token');
}