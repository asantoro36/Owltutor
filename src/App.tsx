import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./home/Home";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#d81e5b',
        }
    },
});

function App() {
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
