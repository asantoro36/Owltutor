import React from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Home} from "./home/Home";
import {createTheme, ThemeProvider} from "@mui/material";
import {Login} from "./login/Login";
import {PasswordRecover} from "./passwordRecover/PasswordRecover";
import {CreateAccount} from "./createAccount/CreateAccount";
import {Congrats} from "./login/Congrats";
import {Profile} from "./profile/Profile";
import {CreateCourse} from "./newCourse/CreateCourse";
import {EditCourse} from "./editCourse/EditCourse";
import {ServiceProvider} from "./editCourse/CourseContext";

const theme = createTheme({
    palette: {
        primary: {
            main: '#d81e5b',
        },
        secondary: {
            main: '#211520'
        }
    },
    typography: {
        fontFamily: [
            'Roboto',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

function App() {
    const isAuthenticated = localStorage.getItem('token') !== "";
    return (
        <ThemeProvider theme={theme}>
            <ServiceProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/password_recover" element={<PasswordRecover/>}/>
                        <Route path="/create" element={<CreateAccount/>}/>
                        <Route path="/createCongrats" element={<Congrats/>}/>
                        <Route
                            path="/profile"
                            element={isAuthenticated ? <Profile/> : <Navigate to="/login"/>}
                        />
                        <Route
                            path="/newCourse"
                            element={isAuthenticated ? <CreateCourse/> : <Navigate to="/login"/>}
                        />
                        <Route
                            path="/editCourse"
                            element={isAuthenticated ? <EditCourse/> : <Navigate to="/login"/>}
                        />
                    </Routes>
                </BrowserRouter>
            </ServiceProvider>
        </ThemeProvider>
    );
}

export default App;
