import React, { useState, useContext, FC, memo } from "react";
import { useHistory, Link } from "react-router-dom";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { PrimaryButton } from "components/molecules/common/PrimaryButton";
import Cookies from "js-cookie";
import { getGuestUserSignIn, signIn } from "lib/api/auth";
import { AuthContext } from "providers/AuthProvider";
import { useSnackbar } from "providers/SnackbarProvider";
import { SignInParams } from "types/api/SignInParams";

// サインイン用ページ
export const SignIn: FC = memo(() => {
  const history = useHistory();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const { showSnackbar, resetSnackbar } = useSnackbar();

  // // unmount時にsnackbarリセットして再レンダリング防止
  // useEffect(() => {
  //   return () => {
  //     resetSnackbar();
  //   };
  // }, [resetSnackbar]);

  // 通常ログインボタン押下時
  const onClickSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignInParams = {
      email: email,
      password: password,
    };
    setLoading(true);

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

        history.push("/materials");
        window.location.reload();
        showSnackbar("ログインしました", "success");
      } else {
      }
    } catch (err) {
      showSnackbar("メールアドレス または パスワード に誤りがあります", "error");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ゲストログインボタン押下時
  const onClickGuestSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await getGuestUserSignIn();
      console.log(res);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        history.push("/materials");
        window.location.reload();
        showSnackbar("ゲストユーザーとしてログインしました", "success");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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
                  <IconButton edge="end" onClick={handleTogglePasswordVisibility}>
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
                    ":hover": { color: "primary.main" },
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
                loading={loading}
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
                    ":hover": { color: "primary.main" },
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
              <PrimaryButton onClick={onClickGuestSignIn} loading={loading} fullWidth>
                ゲストログインはこちら
              </PrimaryButton>
            </Box>
          </CardContent>
        </Card>
      </form>
    </>
  );
});
