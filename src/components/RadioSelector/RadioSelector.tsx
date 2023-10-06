import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import React from "react";

export const RadioSelector = ({ label, selectorName, options, setSelectedOption }: { label: string, selectorName: string, options: any[], setSelectedOption: any }) => {
    return(
        <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
        <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name={selectorName}
            onChange={setSelectedOption}
        >
            {options.map((value) => <FormControlLabel value={value.id} control={<Radio />} label={value.name} />)}
        </RadioGroup>
    </FormControl>
    )
}