import {TextField} from "@mui/material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createUser} from "../controller/UserController";

export const CreateAccountForm = () => {

    const navigate = useNavigate()
    const [nameError, setNameError] = useState(false);
    const [surnameError, setSurnameError] = useState(false);
    const [mailError, setMailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [experienceError, setExperienceError] = useState(false);
    const [passwordValidate, setPasswordValidateError] = useState(false);
    const [canContinue, setCanContinue] = useState(false);
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        mail: '',
        phone: '',
        password: '',
        title: '',
        experience: ''
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleContinueButton = () => {
        setNameError(formData.name.trim() === "")
        setSurnameError(formData.surname.trim() === "")
        setMailError(formData.mail.trim() === "")
        setPhoneError(formData.phone.trim() === "")
        const isValidPassword = formData.password.trim() !== "" && formData.password === passwordRepeat;
        setPasswordValidateError(!isValidPassword);
        if(isValidPassword && !nameError && !surnameError && !mailError && !phoneError) {
            setCanContinue(true)
        }
    }

    const handleCreateUserButton = () => {
        setTitleError(formData.title.trim() === "")
        setExperienceError(formData.experience.trim() === "")

        if(!titleError && !experienceError) {

            navigate("/createCongrats")
        }
    }

    return(
        <div className="login-form">
            <h3 className={"title-form"}>Crear cuenta</h3>
            <div className={"login-input-form"}>
                {!canContinue?
                <>
                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Nombre"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        error={nameError}
                        helperText={nameError ? "El campo es obligatorio" : ""}
                    />
                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Apellido"
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                        required
                        error={surnameError}
                        helperText={surnameError ? "El campo es obligatorio" : ""}
                    />
                    <TextField
                        variant="filled"
                        margin="normal"
                        label="e-mail"
                        name="mail"
                        value={formData.mail}
                        onChange={handleInputChange}
                        required
                        error={mailError}
                        helperText={mailError ? "El campo es obligatorio" : ""}
                    />
                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Teléfono"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        error={phoneError}
                        helperText={phoneError ? "El campo es obligatorio" : ""}
                    />
                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Ingresa tu nueva contraseña"
                        name="newPassword"
                        value={formData.password}
                        onChange={(e) => {setFormData({
                            ...formData,
                            ["password"]: e.target.value,
                        })}}
                        required
                        error={passwordValidate}
                        helperText={passwordValidate?"La contraseñas no coinciden":""}
                    />

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
                    <div
                        className={"login-button-form-container primary-button"}
                        onClick={handleContinueButton}
                    >
                        Siguiente
                    </div>
                </> :
                <>
                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Titulos"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        error={titleError}
                        helperText={titleError? "El campo es obligatorio":""}
                    />
                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Breve descripción de tus experiencias"
                        rows={4}
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        multiline
                        error={experienceError}
                        helperText={experienceError? "El campo es obligatorio":""}
                    />
                    <div
                        className={"login-button-form-container primary-button"}
                        onClick={handleCreateUserButton}
                    >
                        Crear
                    </div>
                </>
            }
            </div>
        </div>
    )
}