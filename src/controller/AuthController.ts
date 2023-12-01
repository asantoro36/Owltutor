import {login} from "../services/AuthService";

export const validateAuthCode = (code: string) => {
    return code === "123ABC"
}

export const loginUser = async (formData: any) => {
    const response = await login(formData)
    if (response) {
       localStorage.setItem('token', response.access_token);
    }
    return null;
};


export const LogoutUser = () => {
    localStorage.removeItem('token');
}