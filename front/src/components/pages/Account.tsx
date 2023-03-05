import React, {
  FC,
  useContext,
  useState,
  useEffect,
  memo,
  useCallback,
} from "react";
import {
  // Redirect,
  useHistory,
  // Link,
  // withRouter,
  useParams,
} from "react-router-dom";

// api
import { getUserId } from "lib/api/user";

// context
import { AuthContext } from "providers/AuthProvider";

// import CanNotUserEditToastButton from "../commons/CanNotUserEditToastButton";

import { User } from "types/api/user";
// style

import {
  // Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     marginTop: theme.spacing(6),
//   },
//   submitBtn: {
//     marginTop: theme.spacing(2),
//     flexGrow: 1,
//     textTransform: "none",
//   },
//   header: {
//     textAlign: "center",
//     backgroundColor: "#192e43",
//     color: "white",
//   },
//   card: {
//     padding: theme.spacing(2),
//     maxWidth: 400,
//   },
//   box: {
//     marginTop: "2rem",
//   },
//   link: {
//     textDecoration: "none",
//   },

//   avatarSize: {
//     width: 64,
//     height: 64,
//   },
// }));

export const Account: FC = memo(() => {
  const { loading, isSignedIn, currentUser } = useContext(AuthContext);

  // useState
  // userのプロフィール情報を格納
  const [userProfile, setUserProfile] = useState<User>();
  // userのidを格納
  const [accountId, setAccountId] = useState();
  // const [imageUrl, setImageUrl] = useState();

  const history = useHistory();
  const query: any = useParams();

  // `/users/${id}`へ推移
  const handleGetUserProfile = useCallback(async (query: any) => {
    try {
      if (!loading) {
        if (isSignedIn) {
          const res = await getUserId(query.id);
          console.log("query", query);
          console.log(res.data);
          setUserProfile(res.data);
          console.log(userProfile);
          setAccountId(res.data.id);
          console.log(accountId);
          console.log(query.id);
          console.log(currentUser.id);

          // setImageUrl(res.data.image.url);
        } else {
          console.log("error");
          // <Redirect to="/signin" />;
        }
      }
    } catch (e) {
      console.log(e);

      // history.push("/notfound404");
    }
  }, []);

  // データを取得
  useEffect(() => {
    handleGetUserProfile(query);
  }, [query, handleGetUserProfile]);
  return (
    <>
      <form noValidate autoComplete="off">
        <Card>
          <CardHeader title={`${userProfile?.name}`} />
          <CardContent>
            <Box textAlign="center">
              {/* <Avatar src={imageUrl ? imageUrl : ""} alt="" /> */}
              <TextField
                variant="standard"
                fullWidth
                id="name"
                label="Name"
                name="name"
                type="text"
                margin="dense"
                value={`${userProfile?.name}`}
              />
              {/* emailはログインユーザーでないと見ることはできない。*/}
              {currentUser.id == query.id ? (
                <TextField
                  variant="standard"
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  type="text"
                  margin="dense"
                  value={`${userProfile?.email}`}
                />
              ) : (
                <></>
              )}
              {/* <TextField
                variant="standard"
                fullWidth
                multiline
                maxRows={4}
                id="metadata"
                label="Info"
                name="metadata"
                type="text"
                margin="dense"
                value={`${userProfile}`}
              /> */}
              {/* ログインユーザーのidとqurryで取得したidが同じであるが「編集ボタン」は表示されない */}
              {/* 編集画面を出すために一時コメントアウト */}
              {currentUser.id == query.id &&
              currentUser.email != "guest@example.com" ? (
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  // startIcon={<EditIcon />}
                  style={{ marginTop: "1rem" }}
                  onClick={() => history.push(`/user/edit/${accountId}`)}
                >
                  編集
                </Button>
              ) : (
                <></>
              )}
              {currentUser.email === "guest@example.com" && (
                // <CanNotUserEditToastButton />
                <p>あなたはデータ編集ができません</p>
              )}
            </Box>
          </CardContent>
        </Card>
      </form>

      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/materials")}
      >
        ＜＜ マイページへ
      </Button>
    </>
  );
});
