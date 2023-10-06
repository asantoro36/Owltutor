import {useEffect, useState} from "react";
import {Service} from "../entities/Service";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {ActionsServiceCard} from "../components/ActionsServiceCard/ActionsServiceCard";
import "./Courses.css"
import {useNavigate} from "react-router-dom";
import {getServices, getUserServices, removeService} from "../controller/ServiceController";
import {getLoggedUser} from "../controller/UserController";
import {Divider} from "@mui/material";

export const Courses = () => {

    const [classes, setClasses] = useState<Service[]>([])
    const navigate = useNavigate();
    const loggedUser = getLoggedUser()

    useEffect(() => {
        setClasses(getUserServices(loggedUser?.mail || ""))
    }, []);

    const handleDelete = (serviceId: number) => {
        removeService(serviceId);
        setClasses(getUserServices(loggedUser?.mail || ""));
    }

    return(
        <div className="board">
            <div>
                <div className={'courses-header'}>
                    <h2>Tus publicaciones</h2>
                    <span onClick={() => { navigate("/newCourse") }} className={"contact-button"}>Nueva publicación</span>
                </div>
                <Divider/>
                <div className={`card-container ${classes.length === 0? 'services-not-found' : 'columns'}`}>
                    {
                        classes.length === 0?
                            <Typography variant={"h4"} className={"services-not-found"}>Aún no cargaste nigún servicio para ofrecer</Typography>
                            :
                            classes.map((s: Service) => (
                                <ActionsServiceCard service={s} handleDelete={handleDelete}/>
                            ))
                    }
                </div>
            </div>
        </div>)
}