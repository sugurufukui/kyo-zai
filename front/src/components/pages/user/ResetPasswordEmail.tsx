import React, { FC, memo } from "react";

import { Box, Grid, Paper, Typography } from "@mui/material";

import EmailDeliveryImage from "images/mail_delivery.png";

// パスワードメール確認促進ページ
export const ResetPasswordEmail: FC = memo(() => {
  return (
    <>
      <Grid sx={{ p: 4, borderRadius: "md" }}>
        <Typography variant="h5" gutterBottom>
          メールを確認してください
        </Typography>
        <Typography variant="body1" sx={{ py: 3 }}>
          ご登録いただいたメールアドレスにパスワード再設定メールを送信しました。
        </Typography>
        <Typography variant="body1">
          メールに記載されたリンクをクリックして、パスワードの再設定をしてください。
        </Typography>
      </Grid>
      <Box sx={{ width: "100%", m: "2 auto" }}>
        <Grid wrap="wrap" container display="flex">
          <Grid item xs={12}>
            <Paper
              component="img"
              src={`${EmailDeliveryImage}`}
              sx={{
                width: { xs: "60%", md: "60%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
});
