import * as React from 'react';
import "./FilterBar.css";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormGroup,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Service } from "../../entities/Service";
import {FilterBar} from "./FilterBar";
import FilterListIcon from "@mui/icons-material/FilterList";

interface FilterBarProps {
    services: Service[];
    setFilteredServices: (filteredClasses: Service[]) => void;
}

export const ExpandableFilterBar: React.FC<FilterBarProps> = ({ services, setFilteredServices }) => {
    return (
        <div>
            <Accordion variant={"outlined"}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant={"h6"} className="filter-title"><FilterListIcon/>Filtros</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <FilterBar services={services} setFilteredServices={setFilteredServices}/>
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
        </div>

    );
}
