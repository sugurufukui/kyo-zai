import { FC, memo, useContext } from "react";
import { Link } from "react-router-dom";

import { Button, Card, CardHeader, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { authPages, avatarMenus, noAuthPages } from "components/atoms/AuthMenuData";
import { AuthContext } from "providers/AuthProvider";

export const Page404: FC = memo(() => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  // ログイン/非ログインで表示リンクを変更
  const AuthButtons = () => {
    if (isSignedIn) {
      // ログイン時
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
          {avatarMenus(currentUser).map((avatarMenu) => (
            <Button
              variant="text"
              key={avatarMenu.children}
              startIcon={avatarMenu.icon}
              component={Link}
              to={avatarMenu.link}
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
              {avatarMenu.children}
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
          お探しのページが見つかりませんでした
        </Typography>
      </Box>
      <Box textAlign={"center"} sx={{ m: 2 }}>
        <Typography variant="body1">
          申し訳ありません。お探しのページが見つかりませんでした。
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
