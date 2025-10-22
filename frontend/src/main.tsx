import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline/>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
