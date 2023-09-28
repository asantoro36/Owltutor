import AppBar from "../components/AppBar/AppBar";
import {ServicesBoard} from "./ServicesBoard";
import {Divider} from "@mui/material";
export const Home = () => {

    return (
        <div>
            <AppBar/>
            <Divider/>
            <ServicesBoard/>
        </div>
    )
}