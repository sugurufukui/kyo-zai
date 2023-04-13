// ForgotPassword.tsx
import React, { useState, FC, memo } from "react";
import { useHistory, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { PrimaryButton } from "components/molecules/PrimaryButton";
import { sendResetPasswordInstructions } from "lib/api/auth";
import { useSnackbar } from "providers/SnackbarProvider";
import { Typography } from "@mui/material";

export const ForgotPassword: FC = memo(() => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");

  const { showSnackbar } = useSnackbar();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await sendResetPasswordInstructions({ email });
      history.replace("/send_password_email");
      showSnackbar("パスワード再設定用のメールを送信しました", "success");
    } catch (err) {
      console.log(err);
      showSnackbar("メールアドレスが見つかりませんでした。", "error");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <Card sx={{ p: 4, borderRadius: "md" }}>
        <CardHeader
          sx={{ textAlign: "center" }}
          title="パスワードをお忘れですか？"
        />
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
          <Box sx={{ flexGrow: 1, mt: 3 }}>
            <PrimaryButton fullWidth disabled={!email}>
              パスワード再設定用のメールを送信する
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
