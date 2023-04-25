import React, { useState, FC, memo } from "react";
import { useHistory, Link } from "react-router-dom";

import { PrimaryButton } from "components/molecules/common/PrimaryButton";
import { sendResetPasswordInstructions } from "lib/api/auth";
import { useSnackbar } from "providers/SnackbarProvider";

import { Typography, TextField, Box, Card, CardContent, CardHeader, Divider } from "@mui/material";

// パスワード忘れ用ページ
export const ForgotPassword: FC = memo(() => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { showSnackbar } = useSnackbar();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendResetPasswordInstructions({ email });
      history.push("/send_password_email");
      showSnackbar("パスワード再設定用のメールを送信しました", "success");
    } catch (err) {
      console.log(err);
      showSnackbar("メールアドレスが見つかりませんでした。", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <Card sx={{ p: 4, borderRadius: "md" }}>
        <CardHeader sx={{ textAlign: "center" }} title="パスワードをお忘れですか？" />
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
          <Box sx={{ flexGrow: 1, mt: 3 }}>
            <PrimaryButton disabled={!email} loading={loading} fullWidth>
              パスワード再設定用のメールを送信する
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
