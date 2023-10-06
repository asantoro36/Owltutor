import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Service} from "../../entities/Service";
import {updateService} from "../../controller/ServiceController";

interface ContactDialogProps {
    open: boolean,
    setOpen: any,
    service: Service
}
export function ContactDialog(props: ContactDialogProps) {

    const {open, setOpen, service} = props;
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        time: '',
        message: '',
        name: ''
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleContact = () => {
        service.contact.push({
            id: 0,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            time: formData.time,
            message: formData.message,
        })
        updateService(service)
        handleClose()
    };

    return (
        <div>
    <Dialog open={open}>
        <DialogTitle>{service.title}</DialogTitle>
        <DialogContent>
        <DialogContentText>
            Para contactar al profesor, por favor proporcionanos tu teléfono, email, horario de contacto y cualquier comentario adicional. Gracias!
        </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Nombre"
                    fullWidth
                    variant="standard"
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="phone"
                    label="Teléfono"
                    fullWidth
                    variant="standard"
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="time"
                    label="Horario de contacto"
                    fullWidth
                    variant="standard"
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="message"
                    label="Algún comentario adicional"
                    multiline
                    rows={3}
                    fullWidth
                    variant="standard"
                    onChange={handleInputChange}
                />
        </DialogContent>
    <DialogActions>
        <Button onClick={handleClose}>Cerrar</Button>
        <Button onClick={handleContact}>Contactar</Button>
        </DialogActions>
        </Dialog>
        </div>
);
}