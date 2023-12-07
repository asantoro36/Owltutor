import {IContact} from "../entities/Contact";
import { getUserContacts} from "../services/UserService";
import {updateStatus} from "../services/ContactService";

export const saveContact = (contact: IContact) => {
    let contacts = getFromLocalStorage()
    contact.id = contacts.length
    contacts.push(contact)
    saveInLocalStorage(contacts)
}

export const getContacts = async (): Promise<IContact[]> => {

    const token = localStorage.getItem('token')!!
    const userData = JSON.parse(localStorage.getItem(token)!!)
    console.log(userData.id)
    return await getUserContacts(token, userData.id);
}

export const updateContact = (contact: IContact) => {
    updateStatus(contact, localStorage.getItem('token')!!)
}

const getFromLocalStorage = () => {
    try {
        const contactsJson = localStorage.getItem("contacts");
        if (contactsJson) {
            return JSON.parse(contactsJson);

        } else {
            return [];
        }
    } catch (error) {
        console.error('Error al obtener la lista de contactos desde localStorage:', error);
        return [];
    }
};

const saveInLocalStorage = (contact: IContact[]) => {
    try {
        const contactJson = JSON.stringify(contact);
        localStorage.setItem("contacts", contactJson);
    } catch (error) {
        console.error('Error al guardar la lista de servicios en localStorage:', error);
    }
};