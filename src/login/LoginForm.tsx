import React, {useState} from "react";
import {TextField} from "@mui/material";
import "./Login.css"
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../controller/AuthController";
export const LoginForm = () => {
    const navigate = useNavigate()
    const [hideLoginError, setHideLoginError] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        loginUser(formData).then(() => navigate("/")).catch(() => setHideLoginError(false))
    };

    return (
        <div className="login-form">
            <h3 className={"title-form"}>Inicia sesión</h3>
            <div className={"login-input-form"}>
                <TextField
                    variant="filled"
                    margin="normal"
                    label="Nombre de usuario o correo electrónico"
                    name="email"
                    value={formData.email}
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
            <Typography hidden={hideLoginError} color={"#d32f2f"}>El Usuario o contraseña son incorrectos</Typography>
            <div className={"login-button-form-container"}>
                <div
                    className={"primary-button"}
                    onClick={handleSubmit}
                >
                    Iniciar sesión
                </div>
                <div
                    className={"button-secondary"}
                    onClick={() => navigate("/create")}
                >
                    Crear cuenta
                </div>
            </div>
        </div>
    )
}
