import React, { useState, useContext, FC, memo } from "react";
import { useHistory, Link } from "react-router-dom";
import Cookies from "js-cookie";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import { SignInParams } from "types/api/SignInParams";
import { signIn } from "lib/api/auth";
import { PrimaryButton } from "components/molecules/PrimaryButton";
import { Divider } from "@mui/material";
import { AuthContext } from "providers/AuthProvider";
import { useSnackbar } from "providers/SnackbarProvider";

// サインイン用ページ
export const SignIn: FC = memo(() => {
  const history = useHistory();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const { showSnackbar } = useSnackbar();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

        history.push("/materials");

        // メッセージ
        showSnackbar("ログインしました", "success");
        console.log("ログインしました");
        console.log(res.data.data);
      } else {
      }
    } catch (err) {
      showSnackbar("そのユーザーは登録されていません", "error");

      console.log(err);
    }
  };

  // ゲストログインボタン押下時
  const onClickGuestSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
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

        history.push("/materials");

        showSnackbar("ゲストログインしました", "success");
        console.log("ゲストログインしました");
        console.log(res.data.data);
      } else {
      }
    } catch (err) {
      showSnackbar("ゲストログインできませんでした", "error");

      console.log(err);
    }
  };

  return (
    <>
      <form noValidate autoComplete="off">
        {/* カードとして教材一覧等にも使えるようにコンポーネント化する */}
        <Card sx={{ p: 4, borderRadius: "md" }}>
          <CardHeader sx={{ textAlign: "center" }} title="ログイン" />
          <Divider sx={{ my: 2 }} />
          <CardContent>
            <TextField
              // textfieldと文字が重なる問題あり
              variant="outlined"
              required
              fullWidth
              label="メールアドレス"
              value={email}
              margin="dense"
              onChange={(event) => setEmail(event.target.value)}
              autoFocus
            />
            <TextField
              // パスワードの表示非表示ボタンの追加
              variant="outlined"
              required
              fullWidth
              label="パスワード"
              type="password"
              placeholder="6文字以上"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            {/* パスワードを表示するボタン */}
            {/* パスワードを記憶するボタン */}
            <Box sx={{ flexGrow: 1 }}>
              <PrimaryButton
                onClick={onClickSignIn}
                disabled={!email || !password ? true : false}
                fullWidth
              >
                ログイン
              </PrimaryButton>
            </Box>
            <Box textAlign="center">
              <Typography variant="body2">
                まだアカウントをお持ちでない方は
                <Link to="/signup">こちら</Link>
                から作成してください。
              </Typography>
            </Box>
            <Divider sx={{ my: 4 }} />
            {/* ゲストログイン機能 */}
            <Box sx={{ flexGrow: 1 }}>
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
