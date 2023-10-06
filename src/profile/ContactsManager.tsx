import * as React from "react";
import {Divider, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import {getLoggedUser} from "../controller/UserController";
import {getContacts} from "../controller/ContactController";
import {IContact} from "../entities/Contact";
import { statuses } from "../entities/ContactStatus";
import "./ContactsManager.css"
import {ContactPaper} from "./ContactPaper";
import {useState} from "react";

export const ContactsManager = () => {

    const loggedUser = getLoggedUser()
    const [contacts, setContacts] = useState(getContacts(loggedUser? loggedUser.mail : ""))

    return (
        <div className="board">
            <div>
                <div className={'courses-header'}>
                    <h2>Tus contrataciones</h2>
                </div>
                <Divider/>
                <div className={`${contacts.length === 0? 'services-not-found' : 'columns'}`}>
                    {
                        contacts.length === 0?
                            <Typography variant={"h4"} className={"services-not-found"}>No hay ninguna solicitud pendiente</Typography>
                            :
                            contacts.map((contact: IContact) => (
                                <ContactPaper contact={contact} refetch={setContacts}/>
                            ))
                    }
                </div>
            </div>
        </div>);
}




