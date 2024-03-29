import {TextField} from "@mui/material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createUser, validateUserExisting} from "../controller/UserController";
import Typography from "@mui/material/Typography";




export const CreateAccountForm = () => {

    const navigate = useNavigate()
    const [nameError, setNameError] = useState(false);
    const [surnameError, setSurnameError] = useState(false);
    const [mailError, setMailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [experienceError, setExperienceError] = useState(false);
    const [userExistingError, setUserExistingError] = useState(false);
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
        setUserExistingError(validateUserExisting(formData.mail))
        const isValidPassword = formData.password.trim() !== "" && formData.password === passwordRepeat;
        setPasswordValidateError(!isValidPassword);
        if(isValidPassword && !nameError && !surnameError && !mailError && !phoneError) {
            setCanContinue(true)
        }
    }

    function getRandomColor() {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        return `rgb(${randomR},${randomG},${randomB})`;
    }

    const handleCreateUserButton = async () => {
        setTitleError(formData.title.trim() === "")
        setExperienceError(formData.experience.trim() === "")

        if(!titleError && !experienceError) {
            await createUser({
                name: formData.name,
                surname: formData.surname,
                mail: formData.mail,
                phone: formData.phone,
                password: formData.password,
                title: formData.title,
                experience: formData.experience,
                photoUrl: getRandomColor()
            }).then(() => navigate("/createCongrats"));
        }
    }

    return(
        <div className="create-account-form login-form">
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
                        type={"password"}
                        value={formData.password}
                        onChange={(e) => {setFormData({
                            ...formData,
                            "password": e.target.value,
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
                        type={"password"}
                        value={passwordRepeat}
                        onChange={(e) => {setPasswordRepeat(e.target.value)}}
                        required
                        error={passwordValidate}
                        helperText={passwordValidate?"La contraseñas no coinciden":""}
                    />
                    <Typography hidden={!userExistingError} color={"#d32f2f"}>El email utilizado ya existe</Typography>
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