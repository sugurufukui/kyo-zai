import React, { FC, memo, ReactNode } from "react";

import { Container, Grid } from "@mui/material";

import { Header } from "components/organisms/layout/Header";

type Props = {
  children: ReactNode;
};

// 全てのページで共通となるレイアウト
export const CommonLayout: FC<Props> = memo((props) => {
  const { children } = props;

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="lg">
          <Grid sx={{ my: 4 }} container justifyContent="center">
            <Grid item>{children}</Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
});
