import {User} from "../entities/User";
import {post} from "../services/UserService";
import {changePassword} from "../services/AuthService";

 export const createUser = (userForm: User) => {
    return post(userForm).then(response => {
        console.log(response)
    })
}

export const updatePassword = async (userData: any) => {
     await changePassword(userData)
}

export const getLoggedUser = (): any | null => {
    const token = localStorage.getItem("token")
    if(token){
        const userDataJSON = localStorage.getItem(token);
        if (userDataJSON) {
            try {
                return JSON.parse(userDataJSON);
            } catch (error) {
                console.error('Error al analizar el JSON del usuario:', error);
            }
        }
    }
    return null;
}

export const getUser = (userId: string): User | null => {
    const userDataJSON = localStorage.getItem(userId ? userId : "");
    if (userDataJSON) {
        try {
            return JSON.parse(userDataJSON);
        } catch (error) {
            console.error('Error al analizar el JSON del usuario:', error);
        }
    }
    return null;
}

export const validateUserExisting = (userId: string) => {
    return !!localStorage.getItem(userId)
}
