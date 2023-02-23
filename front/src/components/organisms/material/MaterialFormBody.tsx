import React, { FC, ReactNode, useCallback } from "react";

import {
  Button,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

import { useSnackbar } from "providers/SnackbarProvider";

type Props = {
  value: any;
  onClickSubmit: any;
  children: ReactNode;
  // resetFile: any;
  onChangeName: any;
  onChangeDescription: any;
  // onChangeFileInput: any;
  image: any;
  setImage: any;
  preview: any;
  setPreview: any;
  disabled: any;
};

// 新規登録と編集のフォームと、画像プレビューを表示するコンポーネント
export const MaterialFormBody: FC<Props> = (props) => {
  const {
    onClickSubmit,
    children,
    value,
    // resetFile,
    onChangeName,
    onChangeDescription,
    // onChangeFileInput,
    image,
    setImage,
    preview,
    setPreview,
    disabled,
  } = props;

  const { showSnackbar } = useSnackbar();
  const isLoading = !image && !preview;

  // 画像選択機能
  const uploadImage = useCallback((e) => {
    const file = e.target.files[0];
    // image以外のファイルはnullにしてプレビューさせずにアラート表示;
    if (file.type.includes("image/")) {
      setImage(file);
      console.log(file);
      console.log(image);
    } else {
      setImage(null);
      showSnackbar("そのファイルは登録できません", "error");
      return;
    }
  }, []);

  // プレビュー機能
  const previewImage = useCallback((e) => {
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    console.log(file);
  }, []);

  // 画像選択取り消し
  const resetFile = useCallback(() => {
    setImage(null);
    setPreview(null);
    console.log(image, preview);
  }, []);

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
          autoFocus
          type="description"
          name="description"
          id="description"
          placeholder="教材の説明文"
          variant="outlined"
          multiline
          fullWidth
          rows="4"
          value={value.description}
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          //   setDescription(e.target.value);
          // }}
          onChange={onChangeDescription}
        />
        <div>
          <label htmlFor="icon-button-file">
            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              hidden
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                uploadImage(e);
                previewImage(e);
              }}
              // onChange={onChangeFileInput}
            />
            <IconButton color="inherit" component="span">
              <PhotoCameraIcon />
              <Typography>教材の写真を選択</Typography>
            </IconButton>
          </label>
        </div>
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

                  <img src={preview} alt="preview img" height={260} />
                </Box>
              </div>
            )
          ) : null}
        </div>

        <div>
          <Button
            type="submit"
            variant="outlined"
            size="large"
            color="primary"
            // disabled={!value.name || !value.description || !value.image}
            disabled={disabled}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onClickSubmit();
              }
            }}
          >
            {children}
          </Button>
        </div>
      </form>
    </>
  );
};
