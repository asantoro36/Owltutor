import {useParams} from "react-router-dom";
import AppBar from "../components/AppBar/AppBar";
import {addComment, getService, getUserServices, updateService} from "../controller/ServiceController";
import {Alert, Divider, Snackbar, TextField} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import {getUser} from "../controller/UserController";
import "./ServiceDetail.css"
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import {frecuencies} from "../entities/Frecuency";
import {types} from "../entities/Type";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateRangeIcon from "@mui/icons-material/DateRange";
import {days} from "../entities/Day";
import GradeIcon from "@mui/icons-material/Grade";
import Typography from "@mui/material/Typography";
import {ContactDialog} from "../components/ContactDialog/ContactDialog";
import {IComment} from "../entities/Comment";
import {CommentPaper} from "../components/CommentPaper/CommentPaper";
import {useEffect, useState} from "react";

export const ServiceDetail = () => {

    const [open, setOpen] = React.useState(false);
    const [newComment, setNewComment] = React.useState("");
    const [service, setService ]= useState<any>(undefined)
    const { id } = useParams();
    const [openSnack, setOpenSnack] = React.useState(false);

    const fetchData = async () => {
        try {
            const service = await getService(id? id : "0");
            setService(service)

        } catch (error) {
            console.error('Error al obtener servicios:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, []);

    const handleClick = () => {
        setOpenSnack(true);
    };
    const getConcatenatedDays = () => {
        const selectedDays = service.days.map((id: string) => {
            const foundDay = days.find((day) => day.id === id);
            return foundDay ? foundDay.name : ''; // Si no se encuentra, devolver cadena vacía
        });

        return selectedDays.join('-');
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const sendComment = () => {

        addComment(newComment, id!!)
        handleClick()
    }

    const getDate = () => {
        const fecha = new Date();

        const day = String(fecha.getDate()).padStart(2, '0');
        const month = String(fecha.getMonth() + 1).padStart(2, '0');
        const year = fecha.getFullYear(); // Obtener el año

        return `${day}/${month}/${year}`;
    }

    return (
        <>
            <AppBar/>
            {service && (
            <div className={"detail-board board"}>
                <h1>{service?.title}</h1>
                <div className={"title-detail appbar-userinfo-container"}>
                    <Avatar alt="" sx={{ bgcolor: service?.responsiblePhotoUrl}}>{service?.responsible.charAt(0)}</Avatar>
                    <div>{service?.responsible} </div>
                </div>
                <Divider/>
                <div>
                    <div className={"detail-left-layout"}>
                        <div>{service?.description}</div>
                        <Typography color="textSecondary">Experiencia del profesor:</Typography>
                        <Typography color="textSecondary">{service?.responsibleExperience}</Typography>
                    </div>
                    <div>
                        <div className={"detail-center-layout"}><AccessTimeIcon/> Tiempo de la clase: {service?.duration}</div>
                        <Divider/>
                        <div className={"detail-center-layout"}><EventIcon/> Frecuencia: {frecuencies.find((s: any) => s.id === service?.frequency)?.name}</div>
                        <Divider/>
                        <div className={"detail-center-layout"}><PeopleIcon/> Tipo de clase: {types.find((s: any) => s.id === service?.type)?.name}</div>
                        <Divider/>
                        <div className={"detail-center-layout"}><DateRangeIcon/> Dias de cursada: {getConcatenatedDays()}</div>
                        <Divider/>
                        <div className={"detail-center-layout"}><GradeIcon/>{service.rating}</div>
                        <Divider/>
                        <div className={"detail-center-layout "}>Costo por clase :<span className={"detail-price"}>$ {service?.cost}</span></div>
                    </div>
                    <div className={"detail-right-layout"}>
                        <div onClick={() => setOpen(!open) } className="contact-button">Contactar</div>
                    </div>
                </div>
                <div>
                    <h3>Comentarios:</h3>
                    <div className={"comments-overflow"}>{service.comments.map((c: IComment) => c.status === "APPROVED" && <CommentPaper comment={c} updateComment={null}/>)}</div>
                </div>
                <div className={"add-comment-layout"}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="Deja un comentario"
                        name="newComment"
                        value={newComment}
                        fullWidth
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                    />
                    <div onClick={sendComment} className={"button-secondary"}>Comentar</div>
                </div>
                <ContactDialog open={open} setOpen={setOpen} service={service}/>
            </div>
            )}
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Tu comentario se envió exitosamente!
                </Alert>
            </Snackbar>

        </>
        );
}