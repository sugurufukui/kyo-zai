// front/src/components/organisms/layout/Header.tsx
import React, { FC, memo, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Box, Container, SwipeableDrawer } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { HamburgerButton } from "components/atoms/button/HamburgerButton";
import { authPages, avatarMenus, noAuthPages } from "components/atoms/AuthMenuData";
import { AuthButtons } from "components/molecules/common/AuthButtons";
import { AvatarMenu } from "components/molecules/common/AvatarMenu";
import { useAvatarMenu } from "hooks/common/useAvatarMenu";
import { AuthContext } from "providers/AuthProvider";
import LogoIcon from "images/top.png";

export const Header: FC = memo(() => {
  // アバターボタンメニューの処理
  const { avatarMenuOpened, onClickAvatar, onCloseAvatarMenu, onClickSignOut } = useAvatarMenu();
  const { isSignedIn, currentUser } = useContext(AuthContext);

  // アバターボタンのメニュー
  const avatarMenuItems = avatarMenus(currentUser);

  // ドロワー開閉
  const [drawerOpened, setDrawerOpened] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container>
            <Toolbar disableGutters>
              <Typography component="div" sx={{ flexGrow: 1 }}>
                <Link to="/">
                  <img src={`${LogoIcon}`} alt="ロゴアイコン" width="70" height="70" />
                </Link>
              </Typography>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <AuthButtons
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
                  avatarMenu={avatarMenuItems}
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
