import {TextField} from "@mui/material";
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import {validateAuthCode} from "../controller/AuthController";
import {updatePassword} from "../controller/UserController";

export const PasswordRecoverForm = () => {

    const navigate = useNavigate();

    const [userIdentity, setUserIdentity] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const [isUserInserted, setIsUserInserted] = useState(false);
    const [invalidCodeError, setInvalidCodeError] = useState(false);
    const [passwordValidate, setPasswordValidateError] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        code: ''
    });
    const [showEmailError, setShowEmailError] = useState(false)
    const handleInputChange = (event: any) => {
        setUserIdentity(event.target.value)
    };

    const handleSendCode = (event: any) => {

        if(userIdentity.trim() === "") {
            setShowEmailError(true)
        } else {
            //Recupero el user y envio el codigo y seteo el {email o id?}
            setFormData({
                ...formData,
                "email": userIdentity,
            });
            setIsUserInserted(true)
        }
    };

    const handleSendChangePassword = () => {
        const { password, code } = formData;

        const isValidPassword = password.trim() !== "" && password === passwordRepeat;
        const isValidCode = validateAuthCode(code);

        setPasswordValidateError(!isValidPassword);
        setInvalidCodeError(!isValidCode);

        if (isValidPassword && isValidCode) {
            updatePassword(formData.email, formData.password);
            navigate('/login');
        }

    }

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
                            error={showEmailError}
                            helperText={showEmailError?"Esté campo es obligatorio":""}
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
                            onChange={(e) => {setFormData({
                                ...formData,
                                "code": e.target.value,
                            })}}
                            required
                            error={invalidCodeError}
                            helperText={invalidCodeError?"El código es incorrecto":""}
                        />
                    </div>
                    <div className={"login-input-form"}>
                        <TextField
                            variant="filled"
                            margin="normal"
                            label="Ingresa tu nueva contraseña"
                            name="newPassword"
                            value={formData.password}
                            onChange={(e) => {setFormData({
                                ...formData,
                                "password": e.target.value,
                            })}}
                            required
                            error={passwordValidate}
                            helperText={passwordValidate?"La contraseñas no coinciden":""}
                        />
                    </div>
                    <div className={"login-input-form"}>
                        <TextField
                            variant="filled"
                            margin="normal"
                            label="Repite la contraseña"
                            name="newPasswordRepeat"
                            value={passwordRepeat}
                            onChange={(e) => {setPasswordRepeat(e.target.value)}}
                            required
                            error={passwordValidate}
                            helperText={passwordValidate?"La contraseñas no coinciden":""}
                        />
                    </div>
                    <div>
                        <div
                            className={"login-button-form-container primary-button"}
                            onClick={handleSendChangePassword}
                        >
                            Enviar
                        </div>
                    </div>
                </>
            )}
        </div>
    );

}