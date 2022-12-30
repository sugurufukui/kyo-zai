import React, { useState, useContext, FC, memo } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";

import { AuthContext } from "providers/AuthProvider";
import { signUp } from "lib/api/auth";
import { SignUpParams } from "types/api/SignUpParams";
import { Box, Divider } from "@mui/material";
import { useSnackbar } from "providers/SnackbarProvider";
import { PrimaryButton } from "components/atoms/PrimaryButton";
// サインアップ用ページ
export const SignUp: FC = memo(() => {
  const histroy = useHistory();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const { showSnackbar } = useSnackbar();

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
        // アカウント作成と同時にサインインさせてしまう
        //メール認証を挟む

        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        histroy.push("/");

        showSnackbar("登録しました", "success");
      } else {
        alert("登録できませんでした");
        console.log("登録できませんでした");
        // setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      showSnackbar("登録できませんでした", "error");
      // setAlertMessageOpen(true);
    }
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Card sx={{ p: 4, maxWidth: 400 }}>
          <CardHeader title="ユーザー登録" />
          <Divider sx={{ my: 2 }} />

          {/* Textfieldを共通化してきりわける */}
          <CardContent>
            <TextField
              variant="outlined"
              // required
              fullWidth
              label="名前"
              value={name}
              margin="dense"
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              variant="outlined"
              // required
              fullWidth
              label="メールアドレス"
              value={email}
              margin="dense"
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              // required
              fullWidth
              label="パスワード"
              type="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              // required
              fullWidth
              label="パスワード（確認用）"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />

            {/* <Box sx={{ flexGrow: 1 }}>
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
            </Box> */}
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              disabled={
                !name || !email || !password || !passwordConfirmation
                  ? true
                  : false
              }
              onClick={onClickRegister}
            >
              ユーザー登録する
            </Button>
          </CardContent>
        </Card>
      </form>

      {/* アカウントをお持ちの方はこちら （サインインのリンク）*/}

      {/* <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="メールアドレスかパスワードが間違っています"
      /> */}
    </>
  );
});
