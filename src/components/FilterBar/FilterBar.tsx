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

interface FilterBarProps {
    services: Service[];
    setFilteredServices: (filteredClasses: Service[]) => void;
}

let INDIVIDUAL = 'individual'
let GROUP = 'group'
let UNIQUE = 'unique'
let WEEKLY = 'weekly'
let MONTHLY = 'monthly'
let REGULAR = 'regular'
let GOOD = 'good'
let VERY_GOOD = 'veryGood'

const filtersStatus = new Map([
    [INDIVIDUAL, false],
    [GROUP, false],
    [UNIQUE, false],
    [WEEKLY, false],
    [MONTHLY, false],
    [REGULAR, false],
    [GOOD, false],
    [VERY_GOOD, false]
]);


export const FilterBar:  React.FC<FilterBarProps>  = ({ services, setFilteredServices}) => {

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

        filtersStatus.set(filter, newValue)
        const filteredServices = services.filter((service: Service) => {
            return shouldRemove(INDIVIDUAL, service.type.toLowerCase()) &&
                shouldRemove(GROUP, service.type.toLowerCase()) &&
                shouldRemove(UNIQUE, service.frequency.toLowerCase()) &&
                shouldRemove(WEEKLY, service.frequency.toLowerCase()) &&
                shouldRemove(MONTHLY, service.frequency.toLowerCase())
        })
        setFilteredServices(filteredServices)
    }

    const shouldRemove = (param: string, attributeToValidate: string) => {
        if(filtersStatus.get(param)) {
            console.log(filtersStatus.get(param) + " " + attributeToValidate === param)
            return attributeToValidate === param
        }
        return true
    }

    return (
        <Stack className={"filters"} spacing={2}>
            <div><Typography variant={"h6"} className="filter-title"><FilterListIcon/>Filtros</Typography></div>
            <div>
                <Typography variant="subtitle2" className="filter-subtitle-font">Tipo:</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={(e) => {applyFilters(INDIVIDUAL, e.target.checked )} }/>} label="Individual" />
                    <FormControlLabel control={<Checkbox onChange={(e) => {applyFilters(GROUP, e.target.checked )} }/>} label="Grupal" />
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