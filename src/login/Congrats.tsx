import React from "react";
import AppBar from "../components/AppBar/AppBar";
import Typography from "@mui/material/Typography";

export const Congrats = () => {

    return (
        <>
            <AppBar/>
            <div className="login-form">
                <h3 className={"title-form"}>¡Gracias por unirte! Tu cuenta se ha creado con éxito.</h3>
                <div className={"login-input-form"}>
                    <div style={{textAlign:"center"}}>
                        <img alt={"check"} src={"./check-img.png"} style={{width: 80, height: 80}}/>
                        <br/>
                        <br/>
                        <a href={"/login"}><Typography fontWeight={"bold"}>Ir al login</Typography></a>
                    </div>
                </div>
            </div>
        </>
    )
}