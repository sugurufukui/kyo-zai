import React, { FC, ReactNode, useCallback } from "react";

import {
  Button,
  IconButton,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";

import { useSnackbar } from "providers/SnackbarProvider";

type Props = {
  value: any;
  onClickSubmit: any;
  children: ReactNode;
  onChangeName: any;
  onChangeDescription: any;
  image?: any;
  setImage: any;
  preview?: any;
  setPreview: any;
  disabled: any;
  onChangeImage?: any;
  startIcon: any;
};

// 新規登録と編集のフォームと、画像プレビューを表示するコンポーネント
export const MaterialFormBody: FC<Props> = (props) => {
  const {
    onClickSubmit,
    children,
    value,
    onChangeName,
    onChangeDescription,
    image,
    setImage,
    preview,
    setPreview,
    disabled,
    onChangeImage,
    startIcon,
  } = props;

  const { showSnackbar } = useSnackbar();
  const isLoading = !image && !preview;

  // 画像選択機能
  const uploadImage = useCallback(
    (e) => {
      const file = e.target.files[0];
      // image以外のファイルはnullにしてプレビューさせずにアラート表示;
      if (file.type.includes("image/")) {
        setImage(file);
        console.log("file", file);
        console.log("image", image);
      } else {
        setImage(null);
        showSnackbar("そのファイルは登録できません", "error");
        return;
      }
    },
    [setImage, showSnackbar, image]
  );

  // プレビュー機能
  const previewImage = useCallback(
    (e) => {
      const file = e.target.files[0];
      setPreview(window.URL.createObjectURL(file));
      console.log("file", file);
      console.log("value.file", value.file);
    },
    [setPreview]
  );

  // 画像選択取り消し
  const resetFile = useCallback(() => {
    setImage(null);
    setPreview(null);
    console.log("image", image);
    console.log("preview", preview);
  }, [setImage, setPreview, image, preview]);

  return (
    <>
      <form noValidate onSubmit={onClickSubmit}>
        <TextField
          autoFocus
          type="text"
          name="name"
          id="name"
          placeholder="教材の名前"
          variant="outlined"
          fullWidth
          rows="2"
          value={value.name}
          onChange={onChangeName}
        />
        <TextField
          type="description"
          name="description"
          id="description"
          placeholder="教材の説明文"
          variant="outlined"
          multiline
          fullWidth
          rows="4"
          value={value.description}
          onChange={onChangeDescription}
        />

        {/* 編集画面に表示 */}
        <div>
          {/* 変更前の写真を表示 */}
          {value.image ? (
            <>
              <Typography>変更前</Typography>
              <div>
                <Box>
                  <img
                    src={value.image?.url}
                    alt="変更前の写真"
                    width={(260 * 4) / 3}
                    height={260}
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
        </div>
        {/* 新しい画像を未選択時には選択ボタン表示。選択後は非表示*/}
        <div>
          {!preview ? (
            <>
              <label htmlFor="icon-button-file">
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  hidden
                  // 一度プレビューとアップロードをコメントアウトしてedit画面でvalueを編集できるようにする
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  //   uploadImage(e);
                  //   previewImage(e);
                  // }}
                  onChange={onChangeImage}
                />

                <IconButton color="inherit" component="span">
                  <PhotoCameraIcon />
                  <Typography>教材の写真を選択</Typography>
                </IconButton>
              </label>
              <Box
                sx={{
                  display: "flex",

                  "& > :not(style)": {
                    m: 1,
                    width: (260 * 4) / 3,
                    height: 260,
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
        </div>

        {/* 新規作成時 */}
        <div>
          {preview ? (
            isLoading ? (
              <Skeleton />
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
                    width={(260 * 4) / 3}
                    height={260}
                  />
                </Box>
              </div>
            )
          ) : null}
        </div>

        <div>
          {/* 一度押したら画面遷移するまで押せない仕様に */}
          <Button
            type="submit"
            variant="outlined"
            startIcon={startIcon}
            size="large"
            fullWidth
            color="primary"
            disabled={disabled}
            // onClick="disabled = true"
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     onClickSubmit();
            //   }
            // }}
          >
            {children}
          </Button>
        </div>
      </form>
    </>
  );
};
