import {statuses} from "../entities/ContactStatus";
import {Divider, Paper} from "@mui/material";
import * as React from "react";
import {IContact} from "../entities/Contact";
import {getContacts, updateContact} from "../controller/ContactController";
import {getLoggedUser} from "../controller/UserController";

interface ContactPaperProps {
    contact: IContact
    refetch: any
}

export const ContactPaper = (props: ContactPaperProps) => {
    const loggedUser = getLoggedUser()
    const {contact, refetch} = props
    console.log(contact)

    const handleAccept = () => {
        contact.status = 'APPROVED'
        update(contact)
    }

    const handleCancel = () => {
        contact.status = 'CANCELED'
        update(contact)
    }

    const handleFinish = () => {
        contact.status = 'FINISHED'
        update(contact)
    }

    const update = (contact: IContact) =>{
        updateContact(contact)
        refetch()
    }

    return (
        <Paper elevation={5} className={"contact-container"} >
            <div className={"contact-header-container"}>
                <span className={"comment-username"}>{contact?.serviceTitle}</span>
                <span className={"comment-username"}>Estado: {statuses.find((s: any) => s.id === contact.status)?.name}</span>
            </div>
            <Divider/>
            <div className={"contact-content-container"}>
                <span className={"comment-text"}><b>Nombre:</b> {contact.name}</span>
                <div>
                    <span className={"comment-text"}><b>Email:</b> {contact.email}</span>
                    <span className={"comment-text"}><b>Teléfono:</b> {contact.phone}</span>
                    <span className={"comment-text"}><b>Horario de contacto:</b> {contact.time}</span>
                </div>
                <span className={"comment-text"}><b>Comentario:</b> {contact.message}</span>
            </div>
            <div className={"contact-buttons-container"}>

                {contact.status !=="FINISHED" && contact.status!=="CANCELED" &&
                    <span onClick={handleCancel} className={"button-secondary"}>Cancelar</span>
                }
                {contact.status === "APPROVED"?
                    <span onClick={handleFinish} className={"contact-button"}>Finalizar</span>:
                    contact.status !=="FINISHED" && contact.status!=="CANCELED" &&
                    <span onClick={handleAccept} className={"contact-button"}>Aceptar</span>

                }

            </div>
        </Paper>
    )
}