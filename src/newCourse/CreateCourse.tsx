import React, {useState} from "react";
import AppBar from "../components/AppBar/AppBar";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {categories} from "../entities/Categories";
import { RadioSelector } from "../components/RadioSelector/RadioSelector";
import {types} from "../entities/Type";
import { frecuencies } from "../entities/Frecuency";
import {days} from "../entities/Day";
import Typography from "@mui/material/Typography";
import "./CreateCourse.css"
import {saveService} from "../controller/ServiceController";
import {useNavigate} from "react-router-dom";
import {getLoggedUser} from "../controller/UserController";
import {Service} from "../entities/Service";

interface FormData {
    title: string;
    category: string;
    description: string;
    type: string;
    frequency: string;
    duration: string;
    days: string[]; // Definir explícitamente el tipo de days como un arreglo de strings
    cost: string; // Cambiado a string en lugar de boolean
}

export const CreateCourse = () => {

    const navigate = useNavigate()
    const loggedUser = getLoggedUser()
    const [hideError, setHideError] = useState(true);
    const [formData, setFormData] = useState<FormData>({
        title: '',
        category: '',
        description: '',
        type: '',
        frequency: '',
        duration: '',
        days: [],
        cost: '', // Cambiado a false para que sea booleano en lugar de un número
    });

    const parseFormDataToService = (formData: any): Service => {
        return {
            id: -1,
            title: formData.title,
            category: formData.category,
            description: formData.description,
            type: formData.type,
            frequency: formData.frequency,
            rating: 0,
            responsibleId: loggedUser?.mail || "",
            responsible: loggedUser?.name + " " + loggedUser?.surname, //TODO hacer que agregue el id del usuario y luego busque info
            responsibleExperience: loggedUser?.experience || "",
            duration: formData.duration + " minutos",
            days: formData.days,
            cost: formData.cost,
            comments: [],
            isPublished: false,
        };
    };

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDaysInputChange = (event: any) => {
        const { name, checked } = event.target;

        if (checked) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                days: [...prevFormData.days, name],
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                days: prevFormData.days.filter((day) => day !== name),
            }));
        }
    };

    const handleCreateButton = () => {
        if (formData.title === '' ||
            formData.category === '' ||
            formData.description === '' ||
            formData.type === '' ||
            formData.frequency === '' ||
            formData.duration === '' ||
            formData.days.length === 0 ||
            formData.cost === '') {

            setHideError(false);
        } else {
            saveService(parseFormDataToService(formData))
            navigate("/profile")
        }
    }

    return(
        <>
            <AppBar/>
            <div className="login-form">
                <h3 className={"title-form"}>Nuevo servicio</h3>
                <div className={"login-input-form"}>
                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Titulo"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Descripción"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        multiline
                        rows={3}
                    />
                    <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.category}
                        name="category"
                        onChange={handleInputChange}
                    >
                        {categories.map((value) => <MenuItem value={value.id}>{value.name}</MenuItem>)}
                    </Select>

                    <RadioSelector label={"Tipo:"} selectorName={"type"} options={types} setSelectedOption={handleInputChange} />
                    <RadioSelector label={"Frecuencia:"} selectorName={"frequency"} options={frecuencies} setSelectedOption={handleInputChange} />
                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Duración (en minutos)"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                    />
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        Días de la semana:
                    </Typography>
                    <FormGroup>
                        {days.map((value) =>
                            <FormControlLabel
                                key={value.id}
                                control={
                                    <Checkbox
                                        name={value.id}
                                        onChange={handleDaysInputChange}
                                        checked={formData.days.includes(value.id)}
                                    />
                                }
                                label={value.name}
                                value={value.id}
                            />
                        )}
                    </FormGroup>
                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Precio"
                        name="cost"
                        value={formData.cost}
                        onChange={handleInputChange}/>
                    <Typography hidden={hideError} color={"#d32f2f"}>Faltan campos por completar</Typography>
                </div>
                <span onClick={handleCreateButton} className={"finish-create-service-position primary-button"}>Finalizar</span>
            </div>
        </>
    )
}