import {useParams} from "react-router-dom";
import AppBar from "../components/AppBar/AppBar";
import {getService} from "../controller/ServiceController";
import {Divider} from "@mui/material";
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

export const ServiceDetail = () => {

    const [open, setOpen] = React.useState(false);
    const { id } = useParams();
    const service = getService(parseInt(String(id ? parseInt(id) : -1)))
    const userOwner = getUser(service.responsibleId)

    const getConcatenatedDays = () => {
        const selectedDays = service.days.map((id: string) => {
            const foundDay = days.find((day) => day.id === id);
            return foundDay ? foundDay.name : ''; // Si no se encuentra, devolver cadena vacía
        });

        return selectedDays.join('-');
    }

    return (
        <>
            <AppBar/>
            <div className={"detail-board board"}>
                <h1>{service.title}</h1>
                <div className={"title-detail appbar-userinfo-container"}>
                    <Avatar alt="" sx={{ bgcolor: userOwner?.photoUrl}}>{userOwner?.name.charAt(0)}{userOwner?.surname.charAt(0)}</Avatar>
                    <div>{userOwner?.name} {userOwner?.surname}</div>
                </div>
                <Divider/>
                <div>
                    <div className={"detail-left-layout"}>
                        <div>{service?.description}</div>
                        <Typography color="textSecondary">Experiencia del profesor:</Typography>
                        <Typography color="textSecondary">{service?.responsibleExperience}</Typography>
                    </div>
                    <div>
                        <div className={"detail-center-layout"}><AccessTimeIcon/> Tiempo de la clase: {service.duration}</div>
                        <Divider/>
                        <div className={"detail-center-layout"}><EventIcon/> Frecuencia: {frecuencies.find((s: any) => s.id === service.frequency)?.name}</div>
                        <Divider/>
                        <div className={"detail-center-layout"}><PeopleIcon/> Tipo de clase: {types.find((s: any) => s.id === service.type)?.name}</div>
                        <Divider/>
                        <div className={"detail-center-layout"}><DateRangeIcon/> Dias de cursada: {getConcatenatedDays()}</div>
                        <Divider/>
                        <div className={"detail-center-layout"}><GradeIcon/>{service.rating}</div>
                        <Divider/>
                        <div className={"detail-center-layout "}>Costo por clase :<span className={"detail-price"}>$ {service.cost}</span></div>
                    </div>
                    <div className={"detail-right-layout"}>
                        <div onClick={() => setOpen(!open) } className="contact-button">Contactar</div>
                    </div>

                </div>
            </div>
            <ContactDialog open={open} setOpen={setOpen} service={service}/>
        </>
        );
}