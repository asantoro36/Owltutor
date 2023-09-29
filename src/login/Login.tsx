import React, {useState} from "react";
import {Divider, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {ServicesBoard} from "../home/ServicesBoard";
import AppBar from "../components/AppBar/AppBar";

export const Login = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(formData);
    };

    return (
        <div>
            <AppBar/>
            <Divider/>

            <Divider/>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    label="Nombre de usuario o correo electrónico"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Iniciar sesión
                </Button>
            </form>
        </div>
    )
}