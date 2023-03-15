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

export const AccountEdit: FC = memo(() => {
  // 一覧からreact-router-domを使ってidを取得
  const query: any = useParams();
  const [value, setValue] = useState({
    name: "",
    email: "",
  });

  const { currentUser } = useContext(AuthContext);

  const history = useHistory();
  const { showSnackbar } = useSnackbar();

  // 画面が描画されたときとqueryが更新された時にデータを取得する関数を実行
  useEffect(() => {
    handleGetData(query);
  }, [query]);

  const handleGetData = async (query) => {
    try {
      const res = await getUserId(query.id);
      // 他のユーザーのユーザー編集画面には推移させない

      if (query.id == currentUser.id) {
        setValue({
          name: res.data.name,
          email: res.data.email,
        });
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
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    console.log("value", value);
    console.log("e.target.name", e.target.name);
  };

  // 更新ボタン押下後、idとparameterをapiクライアントに渡し、リクエストを投げる
  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    try {
      // 上で定義して3つの情報が入った入ったformDataをdataに代入
      // const data = updateFormData();
      // paramsの値にdata=formDataの値を代入
      const res = await updateUser(query.id, value);
      console.log(res);
      // リクエストが成功したら一覧画面に推移
      history.push(`/user/${currentUser.id}`);
      showSnackbar("ユーザー情報を編集しました", "success");
    } catch (e) {
      console.log(e);
      history.push("/");
      showSnackbar("他のユーザーの情報を編集することはできません", "error");
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
              value={value.name}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              type="email"
              margin="dense"
              value={value.email}
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
              更新
            </Button>
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
