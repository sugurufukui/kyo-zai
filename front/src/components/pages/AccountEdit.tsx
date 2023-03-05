import { getUserId, updateUser } from "lib/api/user";
import { AuthContext } from "providers/AuthProvider";
import { useSnackbar } from "providers/SnackbarProvider";
import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  CardHeader,
  TextField,
  Box,
  // CircularProgress,
  // IconButton,
  // Paper,
  // Typography,
} from "@mui/material";
import { Card } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
// import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
// import BackspaceTwoToneIcon from "@mui/icons-material/BackspaceTwoTone";

export const AccountEdit: FC = memo(() => {
  // 一覧からreact-router-domを使ってidを取得
  const query: any = useParams();
  const [value, setValue] = useState({
    name: "",
    email: "",
    // image: undefined,
  });
  // const [image, setImage] = useState<File>();
  // const [preview, setPreview] = useState(
  // <
  // string | ArrayBuffer | null | undefined
  // >
  //   undefined
  // );
  // const isLoading = !image && !preview;

  const { loading, setIsSignedIn, currentUser } = useContext(AuthContext);

  const history = useHistory();
  const { showSnackbar } = useSnackbar();

  // 画面が描画されたときとqueryが更新された時にデータを取得する関数を実行
  useEffect(() => {
    handleGetData(query);
  }, [query]);

  const handleGetData = async (query) => {
    try {
      const res = await getUserId(query.id);
      setValue({
        name: res.data.name,
        email: res.data.email,
        // image: res.data.image.url,
      });
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

  // const uploadImage = useCallback(
  //   (e) => {
  //     const file = e.target.files[0];
  //     // image以外のファイルはnullにしてプレビューさせずにアラート表示;
  //     if (file.type.includes("image/")) {
  //       setImage(file);
  //       console.log("file", file);
  //     } else {
  //       setImage(null);
  //       showSnackbar("そのファイルは登録できません", "error");
  //       return;
  //     }
  //   },
  //   [showSnackbar]
  // );

  // // プレビュー機能
  // const previewImage = useCallback((e) => {
  //   const file = e.target.files[0];
  //   setPreview(window.URL.createObjectURL(file));
  //   console.log("file", file);
  // }, []);

  // // 画像選択取り消し
  // const resetFile = useCallback(() => {
  //   setImage(null);
  //   setPreview(null);
  //   console.log("image", image);
  //   console.log("preview", preview);
  // }, [image, preview]);

  // // FormData形式でデータを編集
  // const updateFormData = (): FormData => {
  //   const formData = new FormData();
  //   // formDataにvalue内のnameとdescription、stateのimageを代入
  //   formData.append("name", value.name);
  //   formData.append("description", value.email);
  //   if (image) formData.append("image", image);
  //   console.log("image", image);
  //   return formData;
  // };

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
    }
  };
  return (
    <>
      <form
      // onSubmit={() => {
      //   alert("クリック！");
      // }}
      // onSubmit={handleUpdateAccount}
      >
        <Card>
          <CardHeader title="アカウント編集" />
          {/* <label>
            <Avatar
            // src={image ? URL.createObjectURL(image) : imageUrl}
            // alt=""
            />
          </label> */}

          {/* 編集画面に表示 */}
          {/* <div> */}
          {/* 変更前の写真を表示 */}
          {/* {image ? ( */}
          {/* <> */}
          {/* <Typography>変更前</Typography>
                <div>
                  <Box>
                    <img
                      src={value.image}
                      alt="変更前の写真"
                      width={100}
                      height={100}
                    />
                  </Box>
                </div>
                <Box sx={{ m: 4, height: 0, textAlign: "center" }}>
                  <KeyboardDoubleArrowDownRoundedIcon fontSize="large" />
                </Box>
                <Typography>変更後</Typography>
              </>
            ) : (
              <></>
            )}
          </div> */}
          {/* 新しい画像を未選択時には選択ボタン表示。選択後は非表示*/}
          {/* <div>
            {!preview ? (
              <>
                <label htmlFor="icon-button-file">
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    name="image"
                    type="file"
                    hidden
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      uploadImage(e);
                      previewImage(e);
                      handleChange(e);
                    }}
                  />

                  <IconButton color="inherit" component="span">
                    <PhotoCameraIcon />
                    <Typography>ユーザーアイコンを選択</Typography>
                  </IconButton>
                </label>
                <Box
                  sx={{
                    display: "flex",

                    "& > :not(style)": {
                      m: 1,
                      width: 100,
                      height: 100,
                      backgroundColor: "#EDF2F7",
                    },
                  }}
                >
                  <Paper elevation={3} />
                </Box>
              </>
            ) : (
              <></>
            )}
          </div> */}
          {/* 新規作成時 */}
          {/* <div>
            {preview ? (
              isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <div>
                  <Box>
                    <Box sx={{ height: 0, textAlign: "right" }}>
                      <IconButton onClick={resetFile}>
                        <CloseIcon />
                      </IconButton>
                    </Box>

                    <img
                      src={preview}
                      alt="preview img"
                      width={100}
                      height={100}
                    />
                  </Box>
                </div>
              )
            ) : null}
          </div> */}
          <Box>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              type="text"
              margin="dense"
              value={value.name}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              type="text"
              margin="dense"
              value={value.email}
              onChange={(e) => handleChange(e)}
            />
          </Box>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            // startIcon={<UpdateIcon />}
            style={{ marginTop: "2rem" }}
            onClick={(e) => {
              handleUpdateAccount(e);
            }}
          >
            更新
          </Button>
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
