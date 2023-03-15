import React, { FC, memo, useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Cookies from "js-cookie";

import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  SwipeableDrawer,
} from "@mui/material";
import { HamburgerButton } from "components/atoms/button/HamburgerButton";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PostAddIcon from "@mui/icons-material/PostAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";

import { signOut } from "lib/api/auth";

import { AuthContext } from "providers/AuthProvider";

import LogoIcon from "images/top.png";
import { useSnackbar } from "providers/SnackbarProvider";

export const Header: FC = memo(() => {
  //アバターメニュー関係
  const [avatarMenuOpened, setAvatarMenuOpened] = useState(false);
  const onClickAvatar = (e: React.MouseEvent<HTMLElement>) => {
    // setAvatarMenuOpened(e.currentTarget);
    setAvatarMenuOpened(true);
  };
  const onCloseAvatarMenu = () => {
    setAvatarMenuOpened(false);
  };
  // アラート
  const { showSnackbar } = useSnackbar();
  // ドロワー関係
  const [drawerOpened, setDrawerOpened] = useState(false);

  const { loading, isSignedIn, setIsSignedIn, currentUser } =
    useContext(AuthContext);

  const history = useHistory();

  // if文 三項演算子でかけるか？
  // auth ? authPages : noAuthPages;
  // 共通しているものは一つにまとめるか？
  const authPages = [
    { children: "HOME", icon: <HomeIcon />, link: "/" },
    { children: "教材一覧", icon: <MenuBookIcon />, link: "/materials" },
    // { children: "検索", icon: <SearchIcon />, link: "/" },
    { children: "投稿", icon: <PostAddIcon />, link: "/materials/new" },
  ];
  const noAuthPages = [
    { children: "HOME", icon: <HomeIcon />, link: "/" },
    { children: "新規登録", icon: <PersonAddIcon />, link: "/signup" },
    { children: "ログイン", icon: <LoginIcon />, link: "/signin" },
  ];
  const avatarMenu = [
    {
      children: "マイページ",
      icon: <AccountCircleIcon />,
      link: `/user/${currentUser?.id}`,
    },
    { children: "投稿した教材", icon: <MenuBookIcon />, link: "/my_materials" },
    {
      children: "いいねした教材",
      icon: <FavoriteBorderIcon />,
      link: "/my_like",
    },
  ];

  // サインアウトボタンをクリックした時
  const onClickSignOut = async (event) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        history.push("/signin");

        // ログアウトの確認モーダルを表示
        showSnackbar("ログアウトしました", "success");
        console.log("ログアウトしました");
        console.log(res);
      } else {
        showSnackbar("ログアウトできませんでした", "error");
      }
    } catch (err) {
      showSnackbar("ログアウトできませんでした", "error");
    }
  };

  // onClickSignOutと一緒にAuthButtonとしてコンポーネント化する：どのディレクトリに分けるべきか
  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (
          //サインインしている状態のボタン=>①HOME②教材一覧③検索④投稿する⑤マイページ（アイコン（アイコンクリック時にモーダル出現））
          <>
            {authPages.map((authPage) => (
              <Button
                key={authPage.children}
                startIcon={authPage.icon}
                component={Link}
                to={authPage.link}
                sx={{ my: 2, mx: 1, color: "white", display: "flex" }}
                size="large"
                onClick={() => setDrawerOpened(false)}
              >
                {authPage.children}
              </Button>
            ))}
          </>
        );
      } else {
        // 未ログイン時
        return (
          <>
            {noAuthPages.map((noAuthPage) => (
              <Button
                key={noAuthPage.children}
                startIcon={noAuthPage.icon}
                component={Link}
                to={noAuthPage.link}
                sx={{ my: 2, mx: 1, color: "white", display: "flex" }}
                onClick={() => setDrawerOpened(false)}
              >
                {noAuthPage.children}
              </Button>
            ))}
          </>
        );
      }
    } else {
      // ローディング終了時
      return <></>;
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container>
            <Toolbar disableGutters>
              <Typography component="div" sx={{ flexGrow: 1 }}>
                <Link to="/">
                  <img
                    src={`${LogoIcon}`}
                    alt="ロゴアイコン"
                    width="70"
                    height="70"
                  />
                </Link>
              </Typography>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <AuthButtons />
              </Box>
              {/* アバターボタン */}
              {/* ログイン時のみ出現させるために三項演算子で分岐。そうすることでログイン時にavatarメニューが左上に開いてしまう */}
              {isSignedIn ? (
                <Box sx={{ flexGrow: 0 }}>
                  <IconButton
                    size="large"
                    onClick={onClickAvatar}
                    sx={{ p: 1.5 }}
                  >
                    <Avatar />
                  </IconButton>
                  {/* Warning: Failed prop type: MUI: The `anchorEl` prop provided to the component is invalid.
The anchor element should be part of the document layout.
Make sure the element is present in the document or that it's not display none.
警告 プロップタイプに失敗しました。MUIです。コンポーネントに提供された `anchorEl` プロップは無効です。
アンカー要素は、ドキュメントレイアウトの一部であるべきです。
アンカー要素がドキュメントに存在するか、表示なしであることを確認してください。*/}
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    // anchorEl={avatarMenuOpened}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={avatarMenuOpened}
                    onClose={onCloseAvatarMenu}
                  >
                    {avatarMenu.map((userMaterial) => (
                      <MenuItem
                        key={userMaterial.children}
                        component={Link}
                        to={userMaterial.link}
                        onClick={onCloseAvatarMenu}
                      >
                        <ListItemIcon>{userMaterial.icon}</ListItemIcon>
                        <Typography textAlign="center">
                          {userMaterial.children}
                        </Typography>
                      </MenuItem>
                    ))}
                    <Divider />
                    <MenuItem key="ログアウト" onClick={onClickSignOut}>
                      <LogoutIcon color="action" />
                      <Typography align="center">ログアウト</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <></>
              )}

              <HamburgerButton onOpen={() => setDrawerOpened(true)} />
              <SwipeableDrawer
                anchor={"right"}
                open={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                onOpen={() => setDrawerOpened(true)}
                PaperProps={{
                  sx: {
                    backgroundColor: "#006666",
                    boxShadow: "none",
                    textAlign: "center",
                  },
                }}
                sx={{ width: "30%" }}
              >
                <AuthButtons />
              </SwipeableDrawer>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
});
