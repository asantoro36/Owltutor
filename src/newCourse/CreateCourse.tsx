import React from "react";
import AppBar from "../components/AppBar/AppBar";
import "./CreateCourse.css"
import {CourseForm} from "./CourseForm";



export const CreateCourse = () => {

    return(
        <>
            <AppBar/>
            <CourseForm isEditing={false}/>
        </>
    )
}