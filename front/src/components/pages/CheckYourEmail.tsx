import React, { FC, memo } from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export const CheckYourEmail: FC = memo(() => {
  return (
    <>
      <Box sx={{ p: 4, borderRadius: "md" }}>
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
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2">
            アカウントをお持ちの方は <Link to="/signin">こちら</Link>。
          </Typography>
        </Box>
      </Box>
    </>
  );
});
