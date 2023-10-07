import ServiceCard from "../components/ServiceCard/ServiceCard";
import "./ServicesBoard.css";
import {useEffect, useState} from "react";
import {FilterBar} from "../components/FilterBar/FilterBar";
import {Service} from "../entities/Service";
import {ExpandableFilterBar} from "../components/FilterBar/ExpandableFilterBar";
import {FilterProvider} from "../components/FilterBar/FilterContext";
import Typography from "@mui/material/Typography";
import FilterListIcon from "@mui/icons-material/FilterList";
import * as React from "react";
import {getServices} from "../controller/ServiceController";

export const ServicesBoard = () => {

    const [classes, setClasses] = useState<Service[]>([])
    const [filteredClasses, setFilteredClasses] = useState<Service[]>([])
    const ServicesList = getServices()

    useEffect(() => {
        setClasses(ServicesList)
        setFilteredClasses(ServicesList);
    }, []);

    return (
        <div className="board">
            <FilterProvider>
                <div className={'filter-board-container'}>
                    <div id={'filter-bar'} className="side-filter-bar">
                        <Typography variant={"h6"} className="filter-title"><FilterListIcon/>Filtros</Typography>
                        <FilterBar services={classes} setFilteredServices={setFilteredClasses}/>
                    </div>
                    <div className={`card-container ${filteredClasses.length === 0? 'services-not-found' : 'columns'}`}>
                        <span id={'expandable-filter-bar'}><ExpandableFilterBar services={classes} setFilteredServices={setFilteredClasses}/></span>
                        {
                            filteredClasses.length === 0?
                                <Typography variant={"h3"} className={"services-not-found"}>No encontramos servicios para esta búsqueda</Typography>
                                :
                                filteredClasses.map((s) => (
                                    s.isPublished && <ServiceCard service={s}/>
                                ))
                        }
                    </div>
                </div>
            </FilterProvider>
        </div>
    )
}