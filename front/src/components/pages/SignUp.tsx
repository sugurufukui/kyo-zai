import React, { useState, useContext, FC, memo } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

import { AuthContext } from "providers/AuthProvider";
import { signUp } from "lib/api/auth";
import { SignUpParams } from "types/api/SignUpParams";
import { Box, Divider, Typography } from "@mui/material";
import { useSnackbar } from "providers/SnackbarProvider";
import { PrimaryButton } from "components/molecules/PrimaryButton";
// サインアップ用ページ

export const SignUp: FC = memo(() => {
  const history = useHistory();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const { showSnackbar } = useSnackbar();

  // 登録ボタン押下時
  const onClickRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    try {
      const res = await signUp(params);
      console.log(res);

      if (res.status === 200) {
        // アカウント作成と同時にサインインさせない
        // メール認証が完了するまで待機
        history.push("/check-your-email");

        showSnackbar("登録しました。メールを確認してください。", "success");
      } else {
        showSnackbar("登録できませんでした", "error");
        console.log("登録できませんでした");
      }
    } catch (err) {
      console.log(err);
      showSnackbar("登録できませんでした", "error");
    }
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Card sx={{ p: 4, borderRadius: "md" }}>
          <CardHeader sx={{ textAlign: "center" }} title="ユーザー登録" />
          <Divider sx={{ my: 2 }} />
          <CardContent>
            <TextField
              variant="outlined"
              fullWidth
              label="名前"
              value={name}
              type="text"
              margin="dense"
              onChange={(event) => setName(event.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              fullWidth
              label="メールアドレス"
              value={email}
              type="email"
              margin="dense"
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              fullWidth
              label="パスワード"
              value={password}
              type="password"
              margin="dense"
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              fullWidth
              label="パスワード（確認用）"
              value={passwordConfirmation}
              type="password"
              margin="dense"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />

            <Box sx={{ flexGrow: 1, mt: 3 }}>
              <PrimaryButton
                onClick={onClickRegister}
                disabled={
                  !name || !email || !password || !passwordConfirmation
                    ? true
                    : false
                }
                fullWidth
              >
                ユーザー登録する
              </PrimaryButton>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Box textAlign="center" sx={{ pb: 1 }}>
                <Typography variant="body2">
                  アカウントをお持ちの方は <Link to="/signin">こちら</Link>。
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </form>
    </>
  );
});
