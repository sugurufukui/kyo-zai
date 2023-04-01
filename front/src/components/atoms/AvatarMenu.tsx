import React from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Divider,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

export const AvatarMenu = ({
  avatarMenuOpened,
  onClickAvatar,
  onCloseAvatarMenu,
  avatarMenu,
  currentUser,
  onClickSignOut,
}) => {
  return (
    <>
      <IconButton
        key={currentUser?.id}
        size="large"
        onClick={onClickAvatar}
        sx={{ p: 1.5 }}
      >
        <Avatar />
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={avatarMenuOpened}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(avatarMenuOpened)}
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
            <Typography textAlign="center">{userMaterial.children}</Typography>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem key="ログアウト" onClick={onClickSignOut}>
          <LogoutIcon color="action" />
          <Typography align="center">ログアウト</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
