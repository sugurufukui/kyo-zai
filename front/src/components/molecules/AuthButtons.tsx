import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const AuthButtons = ({
  loading,
  isSignedIn,
  authPages,
  noAuthPages,
  setDrawerOpened,
}) => {
  if (!loading) {
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
