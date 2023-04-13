import React, { useState, useContext, FC, memo } from "react";
import { useHistory, Link } from "react-router-dom";
import Cookies from "js-cookie";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { SignInParams } from "types/api/SignInParams";
import { getGuestUserSignIn, signIn } from "lib/api/auth";
import { PrimaryButton } from "components/molecules/PrimaryButton";
import { Divider } from "@mui/material";
import { AuthContext } from "providers/AuthProvider";
import { useSnackbar } from "providers/SnackbarProvider";

// サインイン用ページ
export const SignIn: FC = memo(() => {
  const history = useHistory();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { showSnackbar } = useSnackbar();

  // 通常ログインボタン押下時
  const onClickSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignInParams = {
      email: email,
      password: password,
    };

    try {
      const res = await signIn(params);
      console.log(res);

      if (res.status === 200) {
        // 成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        history.replace("/materials");
        showSnackbar("ログインしました", "success");
      } else {
      }
    } catch (err) {
      showSnackbar(
        "メールアドレス または パスワード に誤りがあります",
        "error"
      );

      console.log(err);
    }
  };

  // ゲストログインボタン押下時
  const onClickGuestSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await getGuestUserSignIn();
      console.log(res);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        showSnackbar("ゲストユーザーとしてログインしました", "success");
        history.replace("/materials");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // パスワード表示のON/OFF
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form noValidate>
        <Card sx={{ p: 4, borderRadius: "md" }}>
          <CardHeader sx={{ textAlign: "center" }} title="ログイン" />
          <Divider sx={{ my: 2 }} />
          <CardContent>
            <TextField
              variant="outlined"
              fullWidth
              label="メールアドレス"
              value={email}
              type="email"
              autoComplete="email"
              margin="dense"
              onChange={(event) => setEmail(event.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              fullWidth
              label="パスワード"
              value={password}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              margin="dense"
              placeholder="8文字以上"
              onChange={(event) => setPassword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    edge="end"
                    onClick={handleTogglePasswordVisibility}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
            <Box textAlign="right" sx={{ pt: 1 }}>
              <Typography variant="body2">
                <Box
                  component={Link}
                  to="/forgot_password"
                  sx={{
                    color: "inherit",
                    "&:visited": { color: "inherit" },
                  }}
                >
                  パスワードをお忘れの方はこちら
                </Box>
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, mt: 2 }}>
              <PrimaryButton
                onClick={onClickSignIn}
                disabled={!email || !password ? true : false}
                fullWidth
              >
                ログイン
              </PrimaryButton>
            </Box>
            <Box textAlign="center" sx={{ pt: 2 }}>
              <Typography variant="body2">
                アカウントをお持ちでない方は
                <Box
                  component={Link}
                  to="/signup"
                  sx={{
                    color: "inherit",
                    "&:visited": { color: "inherit" },
                  }}
                >
                  こちら
                </Box>
                から作成してください。
              </Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Box textAlign="center" sx={{ pb: 1 }}>
                <Typography variant="body2">
                  お試しで使ってみたい方はゲストとしてログインしてください。
                </Typography>
              </Box>
              <PrimaryButton onClick={onClickGuestSignIn} fullWidth>
                ゲストログインはこちら
              </PrimaryButton>
            </Box>
          </CardContent>
        </Card>
      </form>
    </>
  );
});
