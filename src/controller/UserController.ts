import {User} from "../entities/User";

const map = new Map<string, User>()

export const createUser = (userForm: any) => {
    map.set(userForm.mail, {
        name: userForm.name,
        surname: userForm.surname,
        mail: userForm.mail,
        phone: userForm.phone,
        password: userForm.password,
        title: userForm.title,
        experience: userForm.experience
    })
}

export const getUser = (email: string) => {
    return map.get(email)
}