import ServiceCard from "../components/ServiceCard/ServiceCard";
import "./ServicesBoard.css";
import {useEffect, useState} from "react";
import {FilterBar} from "../components/FilterBar/FilterBar";
import {Service, ServicesList} from "../Entities/Service";

export const ServicesBoard = () => {

    const [classes, setClasses] = useState<Service[]>([])
    const [filteredClasses, setFilteredClasses] = useState<Service[]>([])

    useEffect(() => {
        setClasses(ServicesList)
        setFilteredClasses(ServicesList);
    }, []);

    return (
        <div className="board">
            <div className="filter-bar">
                <FilterBar services={classes} setFilteredServices={setFilteredClasses}/>
            </div>
            <div className={'card-container columns'}>
                {
                    filteredClasses.map((s) => (
                        <ServiceCard service={s}/>
                    ))
                }
            </div>
        </div>
    )
}