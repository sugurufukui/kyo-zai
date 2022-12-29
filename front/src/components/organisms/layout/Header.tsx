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
import { MenuIconButton } from "components/atoms/button/MenuIconButton";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SearchIcon from "@mui/icons-material/Search";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";

import { signOut } from "lib/api/auth";

import { AuthContext } from "providers/AuthProvider";

import LogoIcon from "images/top.png";

// if文 三項演算子でかけるか？
// auth ? authPages : noAuthPages;
// 共通しているものは一つにまとめるか？
const authPages = [
  { children: "HOME", icon: <HomeIcon />, link: "/", color: "primary" },
  { children: "教材一覧", icon: <MenuBookIcon />, link: "/material" },
  { children: "検索", icon: <SearchIcon />, link: "/" },
  { children: "投稿", icon: <PostAddIcon />, link: "/" },
];
const noAuthPages = [
  { children: "HOME", icon: <HomeIcon />, link: "/" },
  // { children: "教材一覧", icon: <SearchIcon />, link: "/material" },
  // { children: "検索", icon: <SearchIcon />, link: "/" },
  { children: "新規登録", link: "/signup" },
  { children: "ログイン", link: "/signin" },
];
const avatarMenu = [
  { children: "マイページ", icon: <AccountCircleIcon />, link: "/" },
  { children: "投稿した教材", icon: <MenuBookIcon />, link: "/material" },
  { children: "いいねした教材", icon: <FavoriteBorderIcon />, link: "/" },
  {
    children: "フォローしている人",
    icon: <SupervisedUserCircleIcon />,
    link: "/signup",
  },
];

export const Header: FC = memo(() => {
  const [menuOpened, setMenuOpened] = useState(null);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const onClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
    setMenuOpened(event.currentTarget);
  };

  const onCloseAvatarMenu = () => {
    setMenuOpened(null);
  };

  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);

  const histroy = useHistory();

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
        histroy.push("/signin");
        //アラートのポップ画面表示（ログアウトしました）
        alert("ログアウトしました");
        console.log("ログアウトしました");
      } else {
        alert("ログアウトできませんでした");
        console.log("ログアウトしました");
        //アラートのポップ画面表示（ログアウトできませんでした）
      }
    } catch (err) {
      console.log(err);
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
              >
                {noAuthPage.children}
              </Button>
            ))}
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <>
      {/* MenuDrawerでレスポンシブ対応させる */}

      <AppBar>
        <Container>
          <Toolbar disableGutters>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {/* リンクの範囲が広い問題 */}
              <Link to="/">
                <img
                  src={`${LogoIcon}`}
                  alt="ロゴアイコン"
                  width="50"
                  height="50"
                  style={{ display: "block" }}
                />
              </Link>
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <AuthButtons />
            </Box>
            {/* アバターボタン */}
            {/* ログイン時のみ出現 */}
            {/* {isSignedIn ? (

            ) : (
              ""
            )} */}
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={onClickAvatar} sx={{ p: 1.5 }}>
                <Avatar alt="alt" src="https://source.unsplash.com/random" />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={menuOpened}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={menuOpened}
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
                {/* メニュー非表示＆ログアウト一緒にしようとしたらエラー */}
                <MenuItem
                  key="ログアウト"
                  onClick={onClickSignOut}
                  // onCloseUserMaterialsMenu,
                >
                  <Typography align="center">ログアウト</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <MenuIconButton onOpen={() => setDrawerOpened(true)} />
          </Toolbar>
          {/* ドロワーの実装（コンポーネント化） */}
          <div>
            {/* ログイン/日ログインの出し分け */}
            {authPages.map((authpage) => (
              <Button key={authpage.children}></Button>
            ))}
            <SwipeableDrawer
              anchor={"right"}
              open={drawerOpened}
              onClose={() => setDrawerOpened(false)}
              onOpen={() => setDrawerOpened(true)}
              // PaperProps={{ style: { width: "30%" } }}
              PaperProps={{
                sx: {
                  // backgroundColor: "gray",
                  // color: "rgba(225,249,27,1)",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  textAlign: "center",
                },
              }}
              sx={{ width: "30%" }}
            >
              {/* ドロワー内のボタンをクリックして要求された画面が出たらドロワーを閉じる */}
              <AuthButtons />
            </SwipeableDrawer>
          </div>
        </Container>
      </AppBar>
      {/* </Box> */}
    </>
  );
});
