import * as React from 'react';
import "./FilterBar.css"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox, Divider,
    FormControlLabel,
    FormGroup, Radio, RadioGroup, Slider,
    Stack
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Service} from "../../Entities/Service";
import {RATING, GROUP, INDIVIDUAL, MONTHLY, UNIQUE, useFilterContext, WEEKLY, CATEGORY} from "./FilterContext";
import {useEffect} from "react";

interface FilterBarProps {
    services: Service[];
    setFilteredServices: (filteredClasses: Service[]) => void;
}

interface ICategory {
    id: number;
    name: string;
}

export const FilterBar:  React.FC<FilterBarProps>  = ({ services, setFilteredServices}) => {

    const { filters, setFilters, sliderValue, setSliderValue, categorySelected, setCategorySelected } = useFilterContext();
    const categories: ICategory[] = [
        {id: 0, name: "Tutorías escolares"},
        {id: 1, name: "Idiomas"},
        {id: 2, name: "Música"},
        {id: 3, name: "Baile"},
        {id: 4, name: "Actividad física"},
        {id: 5, name: "Deportes"},
        {id: 6, name: "Diseño Gráfico"},
        {id: 7, name: "Programación"},
    ]

    const applyFilters = (filterId: string, shouldFilter: boolean) => {

        const newFiltersSelected = updateFilters(filterId, shouldFilter)

        const filteredServices = services.filter((service: Service) => {
            let typeValidate = true
            let frequencyValidate = true
            let ratingValidate = true
            let categoryValidate = true

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

            if(newFiltersSelected.includes(CATEGORY)) {
                categoryValidate = service.category === (categories.find((category) => category.id === categorySelected))?.name
            }

            return (typeValidate && frequencyValidate && ratingValidate && categoryValidate);
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

    const handleCategorySelectedOnChange = (value: string) => {
        setCategorySelected(parseInt(value))
    }

    useEffect(() => {
        applyFilters(CATEGORY, categorySelected >= 0);
    }, [categorySelected]);

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
                    <FormControlLabel checked={filters.includes(UNIQUE)} control={<Checkbox onChange={(e) => {applyFilters(UNIQUE, e.target.checked )} }/>} label="Única" />
                    <FormControlLabel checked={filters.includes(WEEKLY)} control={<Checkbox onChange={(e) => {applyFilters(WEEKLY, e.target.checked )} }/>} label="Semanal" />
                    <FormControlLabel checked={filters.includes(MONTHLY)} control={<Checkbox onChange={(e) => {applyFilters(MONTHLY, e.target.checked )} }/>} label="Mensual" />
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
                        <RadioGroup
                            name="use-radio-group"
                            defaultValue={categorySelected}
                            value={categorySelected}
                            onChange={(e, value) => {handleCategorySelectedOnChange(value)}}
                        >
                            <FormControlLabel value={-1} label="Todas" control={<Radio />} />
                            {categories.map((value) => <FormControlLabel value={value.id} label={value.name} control={<Radio />} />)}
                        </RadioGroup>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Stack>
    );
}

