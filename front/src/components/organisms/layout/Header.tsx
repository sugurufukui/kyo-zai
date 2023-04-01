// front/src/components/organisms/layout/Header.tsx
import React, { FC, memo, useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Cookies from "js-cookie";

import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { Box, Container, SwipeableDrawer } from "@mui/material";
import { HamburgerButton } from "components/atoms/button/HamburgerButton";
import { useSnackbar } from "providers/SnackbarProvider";
import { signOut } from "lib/api/auth";
import { AuthContext } from "providers/AuthProvider";
import LogoIcon from "images/top.png";
import { AuthButtons } from "components/molecules/AuthButtons";
import { AvatarMenu } from "components/atoms/AvatarMenu";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const Header: FC = memo(() => {
  // アバターメニュー関係
  const [avatarMenuOpened, setAvatarMenuOpened] = useState(undefined);
  const onClickAvatar = () => {
    setAvatarMenuOpened(true);
  };
  const onCloseAvatarMenu = () => {
    setAvatarMenuOpened(undefined);
  };
  // アラート
  const { showSnackbar } = useSnackbar();
  // ドロワー関係
  const [drawerOpened, setDrawerOpened] = useState(false);

  const { loading, isSignedIn, setIsSignedIn, currentUser } =
    useContext(AuthContext);
  const history = useHistory();

  const authPages = [
    { children: "HOME", icon: <HomeIcon />, link: "/" },
    { children: "教材一覧", icon: <MenuBookIcon />, link: "/materials" },
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

  const onClickSignOut = async () => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        history.push("/signin");

        showSnackbar("ログアウトしました", "success");
      } else {
        showSnackbar("ログアウトできませんでした", "error");
      }
    } catch (err) {
      showSnackbar("ログアウトできませんでした", "error");
    }
  };

  useEffect(() => {
    onCloseAvatarMenu();
  }, [currentUser]);

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
                <AuthButtons
                  loading={loading}
                  isSignedIn={isSignedIn}
                  authPages={authPages}
                  noAuthPages={noAuthPages}
                  setDrawerOpened={setDrawerOpened}
                />
              </Box>
              {isSignedIn && (
                <AvatarMenu
                  currentUser={currentUser}
                  avatarMenuOpened={avatarMenuOpened}
                  onClickAvatar={onClickAvatar}
                  onCloseAvatarMenu={onCloseAvatarMenu}
                  avatarMenu={avatarMenu}
                  onClickSignOut={onClickSignOut}
                />
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
                <AuthButtons
                  loading={loading}
                  isSignedIn={isSignedIn}
                  authPages={authPages}
                  noAuthPages={noAuthPages}
                  setDrawerOpened={setDrawerOpened}
                />
              </SwipeableDrawer>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
});
