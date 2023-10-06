import AppBar from "../components/AppBar/AppBar";
import {CourseForm} from "../newCourse/CourseForm";

export const EditCourse = (serviceToEdit: any) => {
    return(
        <>
            <AppBar/>
            <CourseForm isEditing={true}/>
        </>
    )
}