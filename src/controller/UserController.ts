import {User} from "../entities/User";

export const createUser = (userForm: User) => {
    const userData = {
        name: userForm.name,
        surname: userForm.surname,
        mail: userForm.mail,
        phone: userForm.phone,
        password: userForm.password,
        title: userForm.title,
        experience: userForm.experience,
        photoUrl: userForm.photoUrl,
    };

    const userDataJSON = JSON.stringify(userData);
    console.log(userDataJSON)
    localStorage.setItem(userForm.mail, userDataJSON)
}

export const updatePassword = (userEmail: string, newPassword: string) => {
    const userDataJSON = localStorage.getItem(userEmail);
    if (userDataJSON) {
        try {
            let userData = JSON.parse(userDataJSON);
            userData.password = newPassword;
            localStorage.setItem(userEmail, JSON.stringify(userData));

        } catch (error) {
            console.error('Error al analizar el JSON del usuario:', error);
        }
    }
}

export const getLoggedUser = (): User | null => {
    const userId = localStorage.getItem("token")
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