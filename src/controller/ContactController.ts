import {IContact} from "../entities/Contact";

export const saveContact = (contact: IContact) => {
    let contacts = getFromLocalStorage()
    contact.id = contacts.length
    contacts.push(contact)
    saveInLocalStorage(contacts)
}

export const getContacts = (userId: string) => {
    return getFromLocalStorageByUserId(userId)
}

export const updateContact = (contact: IContact) => {
    let savedContacts = getFromLocalStorage();
    const index = savedContacts.findIndex((s: IContact) => s.id === contact.id)
    savedContacts[index===-1? 0 : index] = contact
    saveInLocalStorage(savedContacts)
}

export const getContactId = () => {
    const contacts = getFromLocalStorage();
    return contacts.length > 0 ? Math.max(...contacts.map((contact: { id: any; }) => contact.id)) + 1 : 1;
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

const getFromLocalStorageByUserId = (userId: string) => {
    try {
        const contactsJson = localStorage.getItem("contacts");
        if (contactsJson) {
            const contacts: IContact[] = JSON.parse(contactsJson);

            return contacts.filter((contact) => contact.ownerId === userId);

        } else {
            return [];
        }
    } catch (error) {
        console.error('Error al obtener la lista de contactos desde localStorage:', error);
        return [];
    }
};