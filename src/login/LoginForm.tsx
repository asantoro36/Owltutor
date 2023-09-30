import React, {useState} from "react";
import {FormControl, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import "./Login.css"
import Typography from "@mui/material/Typography";
export const LoginForm = () => {

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
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <h3 className={"title-form"}>Inicia sesión</h3>
                <div className={"login-input-form"}>
                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Nombre de usuario o correo electrónico"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <Typography className={"forget-pass"}><a href={"/password_recover"}>Olvidé mi contraseña</a></Typography>
                </div>
                <div className={"login-button-form-container"}>
                    <div
                        className={"primary-button"}
                    >
                        Iniciar sesión
                    </div>
                    <div
                        className={"button-secondary"}
                    >
                        Crear cuenta
                    </div>
                </div>
            </form>
        </div>
    )
}
