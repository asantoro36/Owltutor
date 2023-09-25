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
import {Service} from "../../Entities/Service";
import {GROUP, INDIVIDUAL, MONTHLY, UNIQUE, useFilterContext, WEEKLY} from "./FilterContext";

interface FilterBarProps {
    services: Service[];
    setFilteredServices: (filteredClasses: Service[]) => void;
}

export const FilterBar:  React.FC<FilterBarProps>  = ({ services, setFilteredServices}) => {

    const { filters, setFilters } = useFilterContext();
    const categories = [
        "Tutorías escolares",
        "Idiomas",
        "Música",
        "Baile",
        "Actividad física",
        "Deportes",
        "Diseño Gráfico",
        "Programación"
    ]

    const applyFilters = (filter: string, newValue: boolean) => {

        const newFiltersSelectedStatus = new Map(filters);
        newFiltersSelectedStatus.set(filter, newValue);
        setFilters(newFiltersSelectedStatus);

        const filteredServices = services.filter((service: Service) => {
            let typeValidate = true
            let frequencyValidate = true
            if(newFiltersSelectedStatus.get(INDIVIDUAL) || newFiltersSelectedStatus.get(GROUP)) {
                typeValidate = shouldBeAdded(INDIVIDUAL, service.type.toLowerCase(), newFiltersSelectedStatus)
                || shouldBeAdded(GROUP, service.type.toLowerCase(), newFiltersSelectedStatus)
            }

            if(newFiltersSelectedStatus.get(UNIQUE) || newFiltersSelectedStatus.get(WEEKLY) || newFiltersSelectedStatus.get(MONTHLY)) {
                frequencyValidate = shouldBeAdded(UNIQUE, service.frequency.toLowerCase(), newFiltersSelectedStatus)
                    || shouldBeAdded(WEEKLY, service.frequency.toLowerCase(), newFiltersSelectedStatus)
                    || shouldBeAdded(MONTHLY, service.frequency.toLowerCase(), newFiltersSelectedStatus)
            }
            return (typeValidate && frequencyValidate);
        });

        setFilteredServices(filteredServices.length !== 0? filteredServices : services)
    }

    const shouldBeAdded = (param: string, attributeToValidate: string, newFiltersSelectedStatus: any) => {
        return newFiltersSelectedStatus.get(param) && attributeToValidate === param
    }

    return (
        <Stack className={"filters"} spacing={2}>
            <div><Typography variant={"h6"} className="filter-title"><FilterListIcon/>Filtros</Typography></div>
            <div>
                <Typography variant="subtitle2" className="filter-subtitle-font">Tipo:</Typography>
                <FormGroup>
                    <FormControlLabel checked={filters.get(INDIVIDUAL)} control={<Checkbox onChange={(e) => {applyFilters(INDIVIDUAL, e.target.checked )} }/>} label="Individual" />
                    <FormControlLabel checked={filters.get(GROUP)} control={<Checkbox onChange={(e) => {applyFilters(GROUP, e.target.checked )} }/>} label="Grupal" />
                </FormGroup>
            </div>
            <Divider />
            <div>
                <Typography variant="subtitle2" className="filter-subtitle-font">Frecuencia:</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={(e) => {applyFilters(UNIQUE, e.target.checked )} }/>} label="Única" />
                    <FormControlLabel control={<Checkbox onChange={(e) => {applyFilters(WEEKLY, e.target.checked )} }/>} label="Semanal" />
                    <FormControlLabel control={<Checkbox onChange={(e) => {applyFilters(MONTHLY, e.target.checked )} }/>} label="Mensual" />
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