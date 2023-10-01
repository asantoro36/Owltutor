import {Divider, TextField} from "@mui/material";
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

export const PasswordRecoverForm = () => {

    const navigate = useNavigate();

    const [userIdentity, setUserIdentity] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [isUserInserted, setIsUserInserted] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        code: ''
    });

    const handleInputChange = (event: any) => {
        //Recupero al user
        setUserIdentity(event.target.value)
        setFormData({
            ...formData,
            ["email"]: event.target.value,
        });
    };

    const handleSendCode = (event: any) => {
        setIsUserInserted(true)
    };

    return (
        <div className="login-form">
            <h3 className={"title-form"}>Recuperar contraseña</h3>
            {!isUserInserted ? (
                <>
                    <div className={"login-input-form"}>
                        <TextField
                            variant="filled"
                            margin="normal"
                            label="Nombre de usuario o correo electrónico"
                            name="userId"
                            value={userIdentity}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <span>
                    <Typography>
                        Se enviará un código de recuperación a su correo
                    </Typography>
                </span>
                    <div>
                        <div
                            className={"login-button-form-container primary-button"}
                            onClick={handleSendCode}
                        >
                            Enviar
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={"login-input-form"}>
                        <TextField
                            variant="filled"
                            margin="normal"
                            label="Código"
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={"login-input-form"}>
                        <TextField
                            variant="filled"
                            margin="normal"
                            label="Ingresa tu nueva contraseña"
                            name="newPassword"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={"login-input-form"}>
                        <TextField
                            variant="filled"
                            margin="normal"
                            label="Repite la contraseña"
                            name="newPasswordRepeat"
                            value={passwordRepeat}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <div
                            className={"login-button-form-container primary-button"}
                            onClick={() => navigate('/login')}
                        >
                            Enviar
                        </div>
                    </div>
                </>
            )}
        </div>
    );

}