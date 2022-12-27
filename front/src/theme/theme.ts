import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#319795",
      // light: "#33ab9f",
      // dark: "#00695f",
    },
    error: {
      main: "#CE3256",
    },
    warning: {
      main: "#F18D5F",
    },
    text: {
      primary: "#1A202C",
    },
    background: {
      // paper: "#fff",
      default: "#EDF2F7",
    },
    // action: {
    //   hover: "#00695f",
    //   disabledBackground: "#CE3256",
    // },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});
export default theme;
