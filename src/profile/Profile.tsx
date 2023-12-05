import AppBar from "../components/AppBar/AppBar";
import React from "react";
import { Courses } from "../courses/Courses";
import {Tab, Tabs} from "@mui/material";
import {ContactsManager} from "./ContactsManager";
import {CommentsManager} from "./CommentsManager";
import {UserData} from "./UserData";

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
                    <Tab value="four" label="Mis datos" />
                </Tabs>
                <div>
                    {value === "one" && (
                        <Courses/>
                    )}
                    {value === "two" && (
                        <ContactsManager/>
                    )}
                    {value === "three" && (
                        <CommentsManager/>
                    )}
                    {value === "four" && (
                        <UserData/>
                    )}
                </div>
            </div>
        </>
    )
}