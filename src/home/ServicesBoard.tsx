import ServiceCard from "../components/ServiceCard/ServiceCard";
import "./ServicesBoard.css";
import {useEffect, useState} from "react";
import {FilterBar} from "../components/FilterBar/FilterBar";
import {Service, ServicesList} from "../Entities/Service";
import {ExpandableFilterBar} from "../components/FilterBar/ExpandableFilterBar";
import {FilterProvider} from "../components/FilterBar/FilterContext";

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
                <div className="filter-bar">

                    <span id={'filter-bar'}> <FilterBar services={classes} setFilteredServices={setFilteredClasses}/></span>
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