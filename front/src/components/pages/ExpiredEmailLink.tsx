import { FC, memo, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardHeader, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PostAddIcon from "@mui/icons-material/PostAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Box } from "@mui/system";
import { AuthContext } from "providers/AuthProvider";

export const ExpiredEmailLink: FC = memo(() => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  const authPages = [
    { children: "HOME", icon: <HomeIcon />, link: "/" },
    { children: "教材一覧", icon: <MenuBookIcon />, link: "/materials" },
    { children: "投稿", icon: <PostAddIcon />, link: "/materials/new" },
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
  const noAuthPages = [
    { children: "HOME", icon: <HomeIcon />, link: "/" },
    { children: "新規登録", icon: <PersonAddIcon />, link: "/signup" },
    { children: "ログイン", icon: <LoginIcon />, link: "/signin" },
  ];

  const AuthButtons = () => {
    if (isSignedIn) {
      return (
        <>
          {authPages.map((authPage) => (
            <Button
              variant="text"
              key={authPage.children}
              startIcon={authPage.icon}
              component={Link}
              to={authPage.link}
              sx={{
                my: 2,
                mx: 1,
                display: "flex",
                color: "white",
                backgroundColor: "#319795",
                ":hover": { boxShadow: 0, bgcolor: "primary.dark" },
              }}
              size="large"
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
              sx={{
                my: 2,
                mx: 1,
                display: "flex",
                color: "white",
                backgroundColor: "#319795",
                ":hover": { boxShadow: 0, bgcolor: "primary.dark" },
              }}
            >
              {noAuthPage.children}
            </Button>
          ))}
        </>
      );
    }
  };

  return (
    <>
      <Box textAlign={"center"} sx={{ m: 4 }}>
        <Typography variant="h4" sx={{ textDecoration: "underline lightgray" }}>
          このメールリンクは有効期限切れです。
        </Typography>
      </Box>
      <Box textAlign={"center"} sx={{ m: 2 }}>
        <Typography variant="body1">
          申し訳ありません。このメールリンクは有効期限切れです。
        </Typography>
        <Typography variant="body1">
          お手数ですが、以下のリンクからお求めのページをお探しください。
        </Typography>
      </Box>

      <Card sx={{ m: 4, p: 2 }}>
        <CardHeader title="ページから探す" />
        <AuthButtons />
      </Card>
    </>
  );
});
