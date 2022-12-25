import React, { FC, memo, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Cookies from "js-cookie";

import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

import { signOut } from "lib/api/auth/signOut";

import { AuthContext } from "router/Router";

export const Header: FC = memo(() => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const { loading, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const histroy = useHistory();

  const onClickSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        histroy.push("/signin");
        //アラートのポップ画面表示（ログアウトしました）
        alert("ログアウトしました");
      } else {
        alert("ログアウトできませんでした");
        //アラートのポップ画面表示（ログアウトできませんでした）
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      //ボタンをprimaryButtonとしてcomponent化する
      if (isSignedIn) {
        return (
          //ボタンをprimaryButtonとしてcomponent化する
          //サインインしている状態のボタン=>①HOME②教材一覧③検索④投稿する⑤マイページ（アイコン（アイコンクリック時にモーダル出現））
          <Button color="inherit" onClick={onClickSignOut}>
            サインアウト
          </Button>
        );
      } else {
        return (
          //ボタンをprimaryButtonとしてcomponent化する
          //サインインしていない状態のボタン＝＞①HOME②教材一覧③検索④新規登録⑤ログイン
          <Button component={Link} to="/signin" color="inherit">
            ログイン
          </Button>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <>
      {/* MenuDrawerでレスポンシブ対応させる */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            {/* スタイルを切り分ける */}
            {/* 色変更する */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {/* イラストを挿入する */}
              {/* クリックするとホームへ戻るようにする */}
              きょーざい
            </Typography>
            <AuthButtons />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
});
