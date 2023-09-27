import ServiceCard from "../components/ServiceCard/ServiceCard";
import "./ServicesBoard.css";
import {useEffect, useState} from "react";
import {FilterBar} from "../components/FilterBar/FilterBar";
import {Service, ServicesList} from "../Entities/Service";
import {ExpandableFilterBar} from "../components/FilterBar/ExpandableFilterBar";
import {FilterProvider} from "../components/FilterBar/FilterContext";
import Typography from "@mui/material/Typography";
import FilterListIcon from "@mui/icons-material/FilterList";
import * as React from "react";

export const ServicesBoard = () => {

    const [classes, setClasses] = useState<Service[]>([])
    const [filteredClasses, setFilteredClasses] = useState<Service[]>([])

    useEffect(() => {
        setClasses(ServicesList)
        setFilteredClasses(ServicesList);
    }, []);

    return (
        <div className="board">
            <FilterProvider>
                <div>
                    <div id={'filter-bar'} className="side-filter-bar">
                        <Typography variant={"h6"} className="filter-title"><FilterListIcon/>Filtros</Typography>
                        <FilterBar services={classes} setFilteredServices={setFilteredClasses}/>
                    </div>
                </div>
                <div className={'card-container columns'}>
                    <span id={'expandable-filter-bar'}><ExpandableFilterBar services={classes} setFilteredServices={setFilteredClasses}/></span>
                    {
                        filteredClasses.map((s) => (
                            <ServiceCard service={s}/>
                        ))
                    }
                </div>
            </FilterProvider>
        </div>
    )
}