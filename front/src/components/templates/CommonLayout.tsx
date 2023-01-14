import React, { FC, memo } from "react";

import { Container, Grid } from "@mui/material";
import { Header } from "components/organisms/layout/Header";
import { ReactNode } from "react";

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
        <Container maxWidth="sm">
          <Grid container justifyContent="center" pt={18}>
            <Grid item>{children}</Grid>
          </Grid>
        </Container>
      </main>
      {/* footer用意する */}
    </>
  );
});
