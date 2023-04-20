import { getUserId, updateUser } from "lib/api/user";
import { AuthContext } from "providers/AuthProvider";
import { useSnackbar } from "providers/SnackbarProvider";
import { FC, memo, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  CardHeader,
  TextField,
  Divider,
  CardContent,
} from "@mui/material";
import { Card } from "@mui/material";
import { DeleteUserModal } from "components/molecules/DeleteUserModal";
import { User } from "types/api/user";

export const AccountEdit: FC = memo(() => {
  const { currentUser } = useContext(AuthContext);

  const history = useHistory();
  const { showSnackbar } = useSnackbar();

  const query: any = useParams();
  const [userProfile, setUserProfile] = useState<User>();

  //退会
  const [open, setOpen] = useState(false);

  const deleteDialogOpen = () => {
    setOpen(true);
  };

  const deleteDialogClose = () => {
    setOpen(false);
  };

  // 画面が描画されたときとqueryが更新された時にデータを取得する関数を実行
  useEffect(() => {
    handleGetData(query);
  }, [query]);

  const handleGetData = async (query) => {
    try {
      const res = await getUserId(query.id);
      // 他のユーザーのユーザー編集画面には推移させない
      if (query?.id == currentUser?.id) {
        setUserProfile(res.data);
      } else {
        history.push("/");
        showSnackbar("他のユーザーの情報を編集することはできません", "error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // テキストフィールドの変更を検知し値を書き換えstateで管理
  const handleChange = (e) => {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value,
    });
  };

  // 編集
  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser(query.id, userProfile);
      console.log(res);
      history.push(`/user/${currentUser.id}`);
      showSnackbar("ユーザー情報を編集しました", "success");
    } catch (e) {
      console.log(e);
      showSnackbar("ユーザー情報を編集できませんでした", "error");
    }
  };

  return (
    <>
      <form>
        <Card sx={{ p: 4, borderRadius: "md" }}>
          <CardHeader sx={{ textAlign: "center" }} title="アカウント編集" />
          <Divider sx={{ my: 2 }} />
          <CardContent>
            <TextField
              variant="outlined"
              fullWidth
              id="name"
              label="名前"
              name="name"
              type="text"
              margin="dense"
              value={userProfile?.name || ""}
              onChange={(e) => handleChange(e)}
            />
            {/* <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              type="email"
              margin="dense"
              value={userProfile?.email || ""}
              onChange={(e) => handleChange(e)}
            /> */}
            <TextField
              variant="outlined"
              fullWidth
              id="introduction"
              label="自己紹介"
              name="introduction"
              type="text"
              multiline
              minRows={4}
              margin="dense"
              placeholder="200文字以内"
              value={userProfile?.introduction || ""}
              onChange={(e) => handleChange(e)}
            />
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              style={{ marginTop: "2rem" }}
              onClick={(e) => {
                handleUpdateAccount(e);
              }}
            >
              編集を完了する
            </Button>
            <Divider sx={{ my: 6 }} />
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={deleteDialogOpen}
            >
              退会する
            </Button>
            <DeleteUserModal
              open={open}
              handleClose={deleteDialogClose}
              user={userProfile}
            />
          </CardContent>
        </Card>
      </form>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push(`/user/${currentUser.id}`)}
      >
        ＜＜ マイページへ
      </Button>
    </>
  );
});
