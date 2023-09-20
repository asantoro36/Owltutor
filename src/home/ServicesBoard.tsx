import ServiceCard from "../components/ServiceCard/ServiceCard";
import "./ServicesBoard.css";
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";
import FilterBar from "../components/FilterBar/FilterBar";

export const ServicesBoard = () => {

    const [classTypeSelected, setClassTypeSelected] = useState<string>("")

    const classTypes = ["Individual", "Grupal"]

    return (
        <div className="board">
            <div className="filter-bar">
                <FilterBar/>
            </div>
            <div className={'card-container columns'}>
                {
                    Array.from({ length: 5 }).map((_, i) => (
                        <ServiceCard></ServiceCard>
                    ))
                }
            </div>
        </div>
    )
}