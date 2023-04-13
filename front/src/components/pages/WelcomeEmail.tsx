import React, { FC, memo } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import welcomeImage from "images/welcome.png";

export const WelcomeEmail: FC = memo(() => {
  return (
    <>
      <Grid sx={{ p: 4, borderRadius: "md" }}>
        <Typography variant="h5" gutterBottom>
          メールを確認してください
        </Typography>
        <Typography variant="body1" sx={{ py: 3 }}>
          特別支援教育教材アプリ「きょーざい」へのご登録ありがとうございます。
        </Typography>
        <Typography variant="body1" sx={{ py: 3 }}>
          ご登録いただいたメールアドレスに確認メールを送信しました。
        </Typography>
        <Typography variant="body1">
          メールに記載されたリンクをクリックして、アカウントの認証を完了してください。
        </Typography>
      </Grid>
      <Box sx={{ width: "100%", m: "2 auto" }}>
        <Grid wrap="wrap" container display="flex">
          <Grid item xs={12}>
            <Paper
              component="img"
              src={`${welcomeImage}`}
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
