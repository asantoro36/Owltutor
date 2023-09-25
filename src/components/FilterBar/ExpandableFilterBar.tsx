import * as React from 'react';
import { useState } from 'react';
import "./FilterBar.css";
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
import { Service } from "../../Entities/Service";
import {FilterBar} from "./FilterBar";

interface FilterBarProps {
    services: Service[];
    setFilteredServices: (filteredClasses: Service[]) => void;
}

export const ExpandableFilterBar: React.FC<FilterBarProps> = ({ services, setFilteredServices }) => {
    const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);

    return (
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
                        <FilterBar services={services} setFilteredServices={setFilteredServices}/>
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
        </div>

    );
}
