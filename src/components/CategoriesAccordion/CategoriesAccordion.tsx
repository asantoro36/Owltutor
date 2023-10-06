import {Accordion, AccordionDetails, AccordionSummary, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {categories} from "../../entities/Categories";



export const CategoriesAccordion = ({ categorySelected, setCategorySelected }: any) => {

    const handleCategorySelectedOnChange = (value: string) => {
        setCategorySelected(parseInt(value))
    }

    return (
        <Accordion variant={"outlined"} >
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
    )
}