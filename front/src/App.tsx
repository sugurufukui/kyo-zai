import React from "react";
import { Router } from "router/Router";
import { BrowserRouter } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";

import theme from "theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
