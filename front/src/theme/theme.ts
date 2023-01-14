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
    fontFamily: [
      "Noto Sans JP",
      "Hiragino Kaku Gothic Pro",
      "ヒラギノ角ゴ Pro",
      "Yu Gothic Medium",
      "游ゴシック Medium",
      "YuGothic",
      "游ゴシック体",
      "メイリオ",
      "sans-serif",
    ].join(","),
  },
});
export default theme;
