import AppBar from "../components/AppBar/AppBar";
import React from "react";
import { Courses } from "../courses/Courses";
import {Tab, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ContactsManager} from "./ContactsManager";

export const Profile = () => {
    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return(
        <>
            <AppBar/>
            <div className={"board"}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab value="one" label="Publicaciones" />
                    <Tab value="two" label="Contrataciones" />
                    <Tab value="three" label="Comentarios" />
                </Tabs>
                <div>
                    {value === "one" && (
                        <Courses/>
                    )}
                    {value === "two" && (
                        <ContactsManager/>
                    )}
                    {value === "three" && (
                        <Typography component="div">
                            Contenido de la pestaña tres
                        </Typography>
                    )}
                </div>
            </div>
        </>
    )
}