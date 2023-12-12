import {Alert, Divider, Snackbar, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import "./UserData.css"
import { getLoggedUser, validateUserExisting} from "../controller/UserController";

export const UserData = () => {

    const loggedUser = getLoggedUser()
    const [nameError, setNameError] = useState(false);
    const [surnameError, setSurnameError] = useState(false);
    const [mailError, setMailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [experienceError, setExperienceError] = useState(false);
    const [userExistingError, setUserExistingError] = useState(false);
    const [passwordValidate, setPasswordValidateError] = useState(false);
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [formData, setFormData] = useState({
        name: loggedUser? loggedUser?.name: "",
        surname: loggedUser? loggedUser?.surname: "",
        email: loggedUser? loggedUser?.email: "",
        phone: loggedUser? loggedUser?.phone: "",
        password: loggedUser? loggedUser?.password: "",
        title: loggedUser? loggedUser?.title: "",
        experience: loggedUser? loggedUser?.experience: ""
    });
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

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
        setMailError(formData.email.trim() === "")
        setPhoneError(formData.phone.trim() === "")
        setUserExistingError(validateUserExisting(formData.email))
        const isValidPassword = formData.password.trim() !== "" && formData.password === passwordRepeat;
        setPasswordValidateError(!isValidPassword);
    }

    const handleCreateUserButton = () => {
        setTitleError(formData.title.trim() === "")
        setExperienceError(formData.experience.trim() === "")

        if(!titleError && !experienceError) {
            /*createUser({
                name: formData.name,
                surname: formData.surname,
                mail: formData.mail,
                phone: formData.phone,
                password: formData.password,
                title: formData.title,
                experience: formData.experience,
                photoUrl: loggedUser? loggedUser.photoUrl : getRandomColor()
            })*/
        }
        handleClick()
    }


    return(
        <div className="board">
            <div className={'courses-header'}>
                <h2>Tus datos</h2>
            </div>
            <Divider/>
            <div className={"login-input-form"}>
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
                    value={formData.email}
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
                <Typography hidden={!userExistingError} color={"#d32f2f"}>El email utilizado ya existe</Typography>
                <div className={"detail-right-layout "}>
                    <span
                        className={"detail-right-layout-button login-button-form-container primary-button"}
                        onClick={handleCreateUserButton}
                    >
                        Guardar
                    </span>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Tus datos fueron actualizados
                </Alert>
            </Snackbar>
        </div>
    )
}