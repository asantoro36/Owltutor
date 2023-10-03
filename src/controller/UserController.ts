import {User} from "../entities/User";

export const createUser = (userForm: User) => {
    const userDataString = `${userForm.name}|${userForm.surname}|${userForm.mail}|${userForm.phone}|${userForm.password}|${userForm.title}|${userForm.experience}`;

    localStorage.setItem(userForm.mail, userDataString)
}

export const getUser = (formData: any) => {
    let userDataString = localStorage.getItem(formData.username)
    const userDataArray = userDataString? userDataString.split('|') : [];

    if (userDataArray.length === 7) {
        const [name, surname, mail, phone, password, title, experience] = userDataArray;

        const user: User = {
            name,
            surname,
            mail,
            phone,
            password,
            title,
            experience,
        };

        return user.password===formData.password? user : null;
    } else {
        return null; // No se pudo parsear correctamente el string
    }
}