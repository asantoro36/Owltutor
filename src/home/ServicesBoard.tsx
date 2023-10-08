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
import {Box, Pagination, PaginationItem} from "@mui/material";

export const ServicesBoard = () => {

    const [classes, setClasses] = useState<Service[]>([])
    const [filteredClasses, setFilteredClasses] = useState<Service[]>([])
    const ServicesList = getServices()
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const numPages = Math.ceil(filteredClasses.filter((s) => s.isPublished).length / itemsPerPage);
    const handlePageChange = (event: any, value: any) => {
        setCurrentPage(value);
    };


    useEffect(() => {
        setClasses(ServicesList)
        setFilteredClasses(ServicesList);
    }, []);

    const renderItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const filteredAndPublishedClasses = filteredClasses.filter((s) => s.isPublished);
        const itemsToRender = filteredAndPublishedClasses.slice(startIndex, endIndex);

        return (<>
                {itemsToRender.map((s, index) => (
                    <ServiceCard key={index} service={s} />
                ))}
            </>
        );
    };

    return (
        <div className="board">
            <FilterProvider>
                <div className={'filter-board-container'}>
                    <div id={'filter-bar'} className="side-filter-bar">
                        <Typography variant={"h6"} className="filter-title"><FilterListIcon/>Filtros</Typography>
                        <FilterBar services={classes} setFilteredServices={setFilteredClasses}/>
                    </div>

                    <div>
                        <div className={`card-container ${filteredClasses.length === 0? 'services-not-found' : 'columns'}`}>
                            <span id={'expandable-filter-bar'}><ExpandableFilterBar services={classes} setFilteredServices={setFilteredClasses}/></span>
                            {
                                filteredClasses.length === 0?
                                    <Typography variant={"h3"} className={"services-not-found"}>No encontramos servicios para esta búsqueda</Typography>
                                    :
                                    <>
                                        {renderItems()}

                                    </>
                            }
                    </div>
                        <Box mt={3} display="flex" justifyContent="center">
                            <Pagination
                                color="secondary"
                                count={numPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                renderItem={(item) => (
                                    <PaginationItem {...item} />
                                )}
                            /></Box>
                    </div>

                </div>
            </FilterProvider>
        </div>
    )
}