import React, { FC, memo } from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";

type Props = {
  isSignedIn: boolean;
  authPages: any[];
  noAuthPages: any[];
  setDrawerOpened: (opened: boolean) => void;
};

// ログイン状態に応じて表示メニューを変えるコンポーネント
export const AuthButtons: FC<Props> = memo((props) => {
  const { isSignedIn, authPages, noAuthPages, setDrawerOpened } = props;

  if (isSignedIn) {
    return (
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
    return (
      <>
        {noAuthPages.map((noAuthPage) => (
          <Button
            key={noAuthPage.children}
            startIcon={noAuthPage.icon}
            component={Link}
            to={noAuthPage.link}
            sx={{ my: 2, mx: 1, color: "white", display: "flex" }}
            size="large"
            onClick={() => setDrawerOpened(false)}
          >
            {noAuthPage.children}
          </Button>
        ))}
      </>
    );
  }
});
