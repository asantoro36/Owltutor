import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./home/Home";
import {createTheme, ThemeProvider} from "@mui/material";
import {Login} from "./login/Login";

const theme = createTheme({
    palette: {
        primary: {
            main: '#d81e5b',
        },
        secondary: {
            main: '#211520'
        }
    },
});

function App() {
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
