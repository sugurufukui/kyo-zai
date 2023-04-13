import React, { useState, FC, memo } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Typography } from "@mui/material";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { PrimaryButton } from "components/molecules/PrimaryButton";
import { resetPassword } from "lib/api/auth";
import { useSnackbar } from "providers/SnackbarProvider";

interface ResetPasswordParams {
  token: string;
}

export const ResetPassword: FC = memo(() => {
  const { token } = useParams<ResetPasswordParams>();
  const history = useHistory();
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const { showSnackbar } = useSnackbar();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await resetPassword({
        reset_password_token: token,
        password,
        password_confirmation: passwordConfirmation,
      });
      history.replace("/signin");
      showSnackbar(
        "パスワードが正常にリセットされました。新しいパスワードでサインインしてください。",
        "success"
      );
    } catch (err) {
      console.log(e);
      showSnackbar(
        "パスワードのリセットに失敗しました。もう一度お試しください。",
        "error"
      );
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <Card sx={{ p: 4, borderRadius: "md" }}>
        <CardHeader
          sx={{ textAlign: "center" }}
          title="パスワードをリセットする"
        />
        <CardContent>
          <TextField
            variant="outlined"
            fullWidth
            label="新しいパスワード"
            value={password}
            type="password"
            margin="dense"
            placeholder="8文字以上"
            onChange={(event) => setPassword(event.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            fullWidth
            label="新しいパスワード（確認）"
            value={passwordConfirmation}
            type="password"
            margin="dense"
            placeholder="8文字以上"
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
          <Box sx={{ flexGrow: 1, mt: 3 }}>
            <PrimaryButton
              fullWidth
              disabled={!password || !passwordConfirmation}
            >
              パスワードをリセットする
            </PrimaryButton>
          </Box>

          <Box textAlign="center" sx={{ pt: 2 }}>
            <Typography variant="body2">
              <Box
                component={Link}
                to="/signin"
                sx={{
                  color: "inherit",
                  "&:visited": { color: "inherit" },
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
