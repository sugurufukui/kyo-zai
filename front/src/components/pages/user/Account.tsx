import React, { FC, useContext, useState, useEffect, memo, useCallback } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";

import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from "@mui/material";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";

import { CanNotUserEditToastButton } from "components/molecules/material/CanNotUserEditToastButton";
import { getUserId } from "lib/api/user";
import { AuthContext } from "providers/AuthProvider";
import { User } from "types/api/user";

// ユーザー情報ページ
export const Account: FC = memo(() => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  const history = useHistory();
  const query: any = useParams();

  const [userProfile, setUserProfile] = useState<User>();
  const [userId, setUserId] = useState();

  // `/users/${id}`へ推移
  const handleGetUserProfile = useCallback(
    async (query: any) => {
      try {
        if (isSignedIn) {
          const res = await getUserId(query.id);
          console.log(res.data);
          setUserProfile(res.data);
          setUserId(res.data.id);
        } else {
          console.log("error");
          <Redirect to="/signin" />;
        }
      } catch (e) {
        console.log(e);
        history.push("/notfound404");
      }
    },
    [history, isSignedIn]
  );

  // データを取得
  useEffect(() => {
    handleGetUserProfile(query);
  }, [query]);

  return (
    <>
      <form noValidate autoComplete="off">
        <Card sx={{ p: 4, borderRadius: "md" }}>
          <CardHeader sx={{ textAlign: "center" }} title="アカウント情報" />
          <Divider sx={{ my: 2 }} />
          <CardContent>
            <TextField
              variant="outlined"
              fullWidth
              color="primary"
              id="name"
              label="名前"
              name="name"
              type="text"
              margin="dense"
              value={`${userProfile?.name}`}
              InputProps={{
                readOnly: true,
              }}
            />
            {/* emailはログインユーザーでないと見ることはできない。*/}
            {currentUser?.id == query?.id ? (
              <TextField
                variant="outlined"
                fullWidth
                color="primary"
                id="email"
                label="メールアドレス"
                name="email"
                type="email"
                margin="dense"
                value={`${userProfile?.email}`}
                InputProps={{
                  readOnly: true,
                }}
              />
            ) : null}
            <TextField
              variant="outlined"
              fullWidth
              color="primary"
              id="introduction"
              label="自己紹介"
              name="introduction"
              type="text"
              multiline
              minRows={4}
              margin="dense"
              placeholder="200文字以内"
              value={`${userProfile?.introduction}`}
              InputProps={{
                readOnly: true,
              }}
            />
            {/* ゲストユーザー以外のログインユーザーに編集可能ボタン出現 */}
            {currentUser?.id == query?.id && currentUser?.email != "guest@example.com" ? (
              <Button
                variant="outlined"
                startIcon={<BuildRoundedIcon />}
                color="primary"
                fullWidth
                style={{ marginTop: "2rem" }}
                onClick={() => history.push(`/user/edit/${userId}`)}
              >
                アカウントを編集する
              </Button>
            ) : null}

            {/* ゲストユーザーの場合、だあミー編集ボタン出現 */}
            {currentUser?.email === "guest@example.com" && (
              <Box sx={{ flexGrow: 1, mt: 3 }}>
                <CanNotUserEditToastButton />
              </Box>
            )}
          </CardContent>
        </Card>
      </form>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => history.push("/mine_materials")}>
          ＜＜ あなたが投稿した教材を見る
        </Button>
      </Box>
      <Button variant="contained" color="primary" onClick={() => history.push("/liked_materials")}>
        ＜＜ あなたがいいね🤍した教材を見る
      </Button>
      <Box></Box>
    </>
  );
});
