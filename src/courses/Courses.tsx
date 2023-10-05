import {useEffect, useState} from "react";
import {Service, ServicesList} from "../entities/Service";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {ActionsServiceCard} from "../components/ActionsServiceCard/ActionsServiceCard";
import "./Courses.css"
import {useNavigate} from "react-router-dom";

export const Courses = () => {

    const [classes, setClasses] = useState<Service[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        setClasses(ServicesList)
    }, []);

    return(
        <div className="board">
            <div>
                <div className={'courses-header'}>
                    <h2>Tus publicaciones</h2>
                    <span onClick={() => { navigate("") }} className={"contact-button"}>Nueva publicación</span>
                </div>
                <div className={`card-container ${classes.length === 0? 'services-not-found' : 'columns'}`}>
                    {
                        classes.length === 0?
                            <Typography variant={"h3"} className={"services-not-found"}>No encontramos servicios para esta búsqueda</Typography>
                            :
                            classes.map((s: Service) => (
                                <ActionsServiceCard service={s}/>
                            ))
                    }
                </div>
            </div>
        </div>)
}