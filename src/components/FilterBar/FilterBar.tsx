import * as React from 'react';
import "./FilterBar.css"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox, Divider,
    FormControlLabel,
    FormGroup, Slider,
    Stack
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Service} from "../../Entities/Service";
import {RATING, GROUP, INDIVIDUAL, MONTHLY, UNIQUE, useFilterContext, WEEKLY} from "./FilterContext";
import {useEffect, useState} from "react";

interface FilterBarProps {
    services: Service[];
    setFilteredServices: (filteredClasses: Service[]) => void;
}

export const FilterBar:  React.FC<FilterBarProps>  = ({ services, setFilteredServices}) => {

    const { filters, setFilters, sliderValue, setSliderValue } = useFilterContext();
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

    const applyFilters = (filterId: string, shouldFilter: boolean) => {

        const newFiltersSelected = updateFilters(filterId, shouldFilter)

        const filteredServices = services.filter((service: Service) => {
            let typeValidate = true
            let frequencyValidate = true
            let ratingValidate = true

            console.log(newFiltersSelected)
            if(newFiltersSelected.includes(INDIVIDUAL) || newFiltersSelected.includes(GROUP)) {
                typeValidate = shouldBeAdded(INDIVIDUAL, service.type.toLowerCase(), newFiltersSelected)
                || shouldBeAdded(GROUP, service.type.toLowerCase(), newFiltersSelected)
            }

            if(newFiltersSelected.includes(UNIQUE) || newFiltersSelected.includes(WEEKLY) || newFiltersSelected.includes(MONTHLY)) {
                frequencyValidate = shouldBeAdded(UNIQUE, service.frequency.toLowerCase(), newFiltersSelected)
                    || shouldBeAdded(WEEKLY, service.frequency.toLowerCase(), newFiltersSelected)
                    || shouldBeAdded(MONTHLY, service.frequency.toLowerCase(), newFiltersSelected)
            }

            if(newFiltersSelected.includes(RATING)) {
                ratingValidate = service.rating >= sliderValue
            }

            return (typeValidate && frequencyValidate && ratingValidate);
        });

        setFilteredServices(newFiltersSelected.length > 0 ? filteredServices : services)
    }

    const updateFilters = (filterId: string, shouldFilter: boolean) => {
        const newFiltersSelected = [...filters];

        if(shouldFilter) {
            if(filterId !==RATING || !newFiltersSelected.includes(RATING))
                newFiltersSelected.push(filterId)
        }
        else {
            const index = newFiltersSelected.indexOf(filterId);
            if (index !== -1) {
                newFiltersSelected.splice(index, 1);
            }
        }
        setFilters(newFiltersSelected);
        return newFiltersSelected
    }

    const shouldBeAdded = (filterId: string, attributeToValidate: string, newFiltersSelectedStatus: any) => {
        return newFiltersSelectedStatus.includes(filterId) && attributeToValidate === filterId
    }

    const handleSliderChange = (event: any, newValue: any) => {
        setSliderValue(newValue);
    };

    useEffect(() => {
        applyFilters(RATING, sliderValue !== 0);
    }, [sliderValue]);

    return (
        <Stack className={"filters"} spacing={2}>
            <div>
                <Typography variant="subtitle2" className="filter-subtitle-font">Tipo:</Typography>
                <FormGroup>
                    <FormControlLabel checked={filters.includes(INDIVIDUAL)} control={<Checkbox onChange={(e) => {applyFilters(INDIVIDUAL, e.target.checked )} }/>} label="Individual" />
                    <FormControlLabel checked={filters.includes(GROUP)} control={<Checkbox onChange={(e) => {applyFilters(GROUP, e.target.checked )} }/>} label="Grupal" />
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
                <Slider
                    min={0}
                    step={0.1}
                    max={5.0}
                    track="inverted"
                    aria-labelledby="track-inverted-slider"
                    defaultValue={30}
                    value={sliderValue}
                    onChange={handleSliderChange}
                />
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