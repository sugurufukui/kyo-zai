import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#319795",
      light: "#33ab9f",
      dark: "#00695f",
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
      default: "#EDF2F7",
    },
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
  components: {
    // TextField 関連のコンポーネントのスタイルを調整する
    MuiInputLabel: {
      styleOverrides: {
        formControl: {
          // 移動をクリック時に動かないように固定
          position: "static",
          transform: "none",
          transition: "none",
          // クリックを可能に
          pointerEvents: "auto",
          cursor: "pointer",
          // 幅いっぱいを解除
          display: "inline",
          alignSelf: "start",
          // タイポグラフィを指定
          fontWeight: "bold",
          fontSize: "0.75rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // デフォルトの小さなmargin削除
          marginTop: 0,
        },
        input: {
          height: "auto",
        },
        notchedOutline: {
          // デフォルトだと、 position が absolute、
          // ラベルをはみ出させるため上に少しの余白がある
          top: 0,
          legend: {
            // 内包された legend 要素によって、四角の左側の切り欠きが実現されているので、
            // 表示されないように。
            display: "none",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          // フォーム下部のテキスト、エラーメッセージ
          marginLeft: 0,
        },
      },
    },
  },
});
export default theme;
