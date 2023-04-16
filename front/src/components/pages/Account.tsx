import React, {
  FC,
  useContext,
  useState,
  useEffect,
  memo,
  useCallback,
} from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";

// api
import { getUserId } from "lib/api/user";

// context
import { AuthContext } from "providers/AuthProvider";

import { User } from "types/api/user";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import { CanNotUserEditToastButton } from "components/molecules/CanNotUserEditToastButton";

export const Account: FC = memo(() => {
  const { loading, isSignedIn, currentUser } = useContext(AuthContext);

  // useState
  // userのプロフィール情報を格納
  const [userProfile, setUserProfile] = useState<User>();
  // userのidを格納
  const [userId, setUserId] = useState();
  const history = useHistory();
  const query: any = useParams();

  // `/users/${id}`へ推移
  const handleGetUserProfile = useCallback(async (query: any) => {
    try {
      if (!loading) {
        if (isSignedIn) {
          const res = await getUserId(query.id);
          console.log(res.data);
          setUserProfile(res.data);
          setUserId(res.data.id);
        } else {
          console.log("error");
          <Redirect to="/signin" />;
        }
      }
    } catch (e) {
      console.log(e);
      history.push("/notfound404");
    }
  }, []);

  // データを取得
  useEffect(() => {
    handleGetUserProfile(query);
  }, [query, handleGetUserProfile]);

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
            ) : (
              <></>
            )}
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
            {currentUser?.id == query?.id &&
            currentUser?.email != "guest@example.com" ? (
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                style={{ marginTop: "2rem" }}
                onClick={() => history.push(`/user/edit/${userId}`)}
              >
                編集
              </Button>
            ) : (
              <></>
            )}
            {currentUser?.email === "guest@example.com" && (
              <Box sx={{ flexGrow: 1, mt: 3 }}>
                <CanNotUserEditToastButton />
              </Box>
            )}
          </CardContent>
        </Card>
      </form>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/my_materials")}
        >
          ＜＜ あなたが投稿した教材を見る
        </Button>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/my_like")}
      >
        ＜＜ あなたがいいね🤍した教材を見る
      </Button>
      <Box></Box>
    </>
  );
});
