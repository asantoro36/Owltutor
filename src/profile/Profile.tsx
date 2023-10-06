import AppBar from "../components/AppBar/AppBar";
import React from "react";
import { Courses } from "../courses/Courses";
import {Tab, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";

export const Profile = () => {
    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return(
        <>
            <AppBar/>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                <Tab value="one" label="Publicaciones" />
                <Tab value="two" label="Item Two" />
                <Tab value="three" label="Item Three" />
            </Tabs>
            <div>
                {value === "one" && (
                    <Courses/>
                )}
                {value === "two" && (
                    <Typography component="div">
                        Contenido de la pestaña dos
                    </Typography>
                )}
                {value === "three" && (
                    <Typography component="div">
                        Contenido de la pestaña tres
                    </Typography>
                )}
            </div>
        </>
    )
}