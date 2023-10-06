import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import React, {useEffect} from "react";
import {Service} from "../../entities/Service";

interface ContactDialogProps {
    open: boolean,
    setOpen: any,
    service: Service
}
export function ContactDialog(props: ContactDialogProps) {

    const {open, setOpen, service} = props;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
    </Button>
    <Dialog open={open}>
        <DialogTitle>{service.title}</DialogTitle>
        <DialogContent>
        <DialogContentText>
            Para contactar al profesor, por favor proporcionanos tu teléfono, email, horario de contacto y cualquier comentario adicional. Gracias!
        </DialogContentText>
                <TextField
                autoFocus
                margin="dense"
                id="phone"
                label="Teléfono"
                fullWidth
                variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="time"
                    label="Horario de contacto"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="message"
                    label="Algún comentario adicional"
                    multiline
                    rows={3}
                    fullWidth
                    variant="standard"
                />
        </DialogContent>
    <DialogActions>
        <Button onClick={handleClose}>Cerrar</Button>
        <Button onClick={handleClose}>Contactar</Button>
        </DialogActions>
        </Dialog>
        </div>
);
}