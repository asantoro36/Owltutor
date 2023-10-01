import React from "react";
import {LoginForm} from "./LoginForm";
import AppBar from "../components/AppBar/AppBar";

export const Login = () => {
    return (
        <div>
            <AppBar/>
            <LoginForm/>
        </div>
    )
}