import React from "react";

import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// ログイン状態に応じたメニューと一覧
// ログイン時
export const authPages = [
  { children: "HOME", icon: <HomeIcon />, link: "/" },
  { children: "教材一覧", icon: <MenuBookIcon />, link: "/materials" },
  { children: "投稿", icon: <PostAddIcon />, link: "/materials/new" },
];

// 非ログイン時
export const noAuthPages = [
  { children: "HOME", icon: <HomeIcon />, link: "/" },
  { children: "新規登録", icon: <PersonAddIcon />, link: "/signup" },
  { children: "ログイン", icon: <LoginIcon />, link: "/signin" },
];

// ログイン時に表示するアバタメニュー
export const avatarMenu = (currentUser) => [
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
