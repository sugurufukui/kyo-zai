import React, { useState, FC, memo } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CardHeader, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import { PrimaryButton } from "components/molecules/common/PrimaryButton";
import { resetPassword } from "lib/api/auth";
import { useSnackbar } from "providers/SnackbarProvider";
import { ResetPasswordParams } from "types/api/ResetPasswordParams";

// パスワード再発行ページ
export const ResetPassword: FC = memo(() => {
  const { token } = useParams<ResetPasswordParams>();
  const history = useHistory();
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const { showSnackbar } = useSnackbar();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetPassword({
        reset_password_token: token,
        password,
        password_confirmation: passwordConfirmation,
      });
      history.push("/signin");
      showSnackbar("変更されました。新しいパスワードでログインしてください。", "success");
    } catch (err) {
      console.log(e);
      showSnackbar("新しいパスワードの登録に失敗しました。もう一度お試しください。", "error");
    } finally {
      setLoading(false);
    }
  };

  // パスワード表示のON/OFF
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <Card sx={{ p: 4, borderRadius: "md" }}>
        <CardHeader sx={{ textAlign: "center" }} title="新しいパスワードを登録する" />
        <Divider sx={{ my: 2 }} />

        <CardContent>
          <TextField
            variant="outlined"
            fullWidth
            label="新しいパスワード"
            value={password}
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            margin="dense"
            placeholder="8文字以上"
            onChange={(event) => setPassword(event.target.value)}
            autoFocus
            InputProps={{
              endAdornment: (
                <IconButton edge="end" onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
          <TextField
            variant="outlined"
            fullWidth
            label="新しいパスワード（確認）"
            value={passwordConfirmation}
            type={showPassword ? "text" : "password"}
            margin="dense"
            placeholder="8文字以上"
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton edge="end" onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
          <Box sx={{ flexGrow: 1, mt: 3 }}>
            <PrimaryButton
              disabled={!password || !passwordConfirmation}
              loading={loading}
              fullWidth
            >
              新しいパスワードを登録する
            </PrimaryButton>
          </Box>
          <Divider sx={{ my: 4 }} />
          <Box textAlign="center" sx={{ pt: 2 }}>
            <Typography variant="body2">
              <Box
                component={Link}
                to="/signin"
                sx={{
                  color: "inherit",
                  "&:visited": { color: "inherit" },
                  ":hover": { color: "primary.main" },
                }}
              >
                ログインページに戻る
              </Box>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
});
