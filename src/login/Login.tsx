import React from "react";
import AppBar from "../components/AppBar/AppBar";
import {LoginForm} from "./LoginForm";

export const Login = () => {
    return (
        <div>
            <AppBar/>
            <LoginForm/>
        </div>
    )
}