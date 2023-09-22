import * as React from 'react';
import "./FilterBar.css"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox, Divider,
    FormControlLabel,
    FormGroup,
    Stack
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import {useState} from "react";
import {Service} from "../../Entities/Service";

interface FilterBarProps {
    services: Service[];
    setFilteredServices: (filteredClasses: Service[]) => void;
}

const filtersStatus = new Map([
    ['individual', false],
    ['group', false],
    ['unique', false],
    ['weekly', false],
    ['monthly', false],
    ['regular', false],
    ['good', false],
    ['veryGood', false]
]);

export const FilterBar:  React.FC<FilterBarProps>  = ({ services, setFilteredServices}) => {

    const categories = [
        "Tutorías Escolares",
        "Cuidado de Niños",
        "Clases de Idiomas",
        "Clases de Música",
        "Clases de Baile",
        "Entrenamiento Personal",
        "Asesoramiento Psicológico",
        "Diseño Gráfico"
    ]

    const applyFilters = () => {
        const filteredServices = services.filter((service: Service) => {
            return service.type.toLowerCase() === "individual"})
        setFilteredServices(filteredServices)
    }

    return (
        <Stack className={"filters"} spacing={2}>
            <div><Typography variant={"h6"} className="filter-title"><FilterListIcon/>Filtros</Typography></div>
            <div>
                <Typography variant="subtitle2" className="filter-subtitle-font">Tipo:</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={(e) => {applyFilters()} }/>} label="Individual" />
                    <FormControlLabel control={<Checkbox onChange={(e) => {filtersStatus.set('group', e.target.checked)} }/>} label="Grupal" />
                </FormGroup>
            </div>
            <Divider />
            <div>
                <Typography variant="subtitle2" className="filter-subtitle-font">Frecuencia:</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Única" />
                    <FormControlLabel control={<Checkbox />} label="Semanal" />
                    <FormControlLabel control={<Checkbox />} label="Mensual" />
                </FormGroup>
            </div>
            <Divider />
            <div>
                <Typography variant="subtitle2" className="filter-subtitle-font">Calificación:</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Regular" />
                    <FormControlLabel control={<Checkbox />} label="Buena" />
                    <FormControlLabel control={<Checkbox />} label="Muy buena" />
                </FormGroup>
            </div>
            <div>
                <Accordion variant={"outlined"}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="subtitle2" className="filter-subtitle-font">Categoría:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            {categories.map((value) => <FormControlLabel control={<Checkbox />} label={value} />)}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Stack>
    );
}