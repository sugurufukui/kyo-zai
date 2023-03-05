import React, { FC, ReactNode } from "react";

import {
  Button,
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";

type Props = {
  title: string;
  value: any;
  onClickSubmit: any;
  children: ReactNode;
  onChangeName: any;
  onChangeDescription: any;
  image?: File;
  preview: any;
  disabled: boolean;
  onChangeImage: any;
  startIcon: any;
  onClickResetFile: any;
};

// 新規登録と編集のフォームと、画像プレビューを表示するコンポーネント
export const MaterialFormBody: FC<Props> = (props) => {
  const {
    title,
    onClickSubmit,
    children,
    value,
    onChangeName,
    onChangeDescription,
    image,
    preview,
    disabled,
    onChangeImage,
    startIcon,
    onClickResetFile,
  } = props;

  const isLoading = !image && !preview;

  return (
    <>
      <form autoComplete="off" onSubmit={onClickSubmit}>
        <Card>
          <CardHeader title={title} />
          <TextField
            variant="outlined"
            required
            fullWidth
            id="name"
            label="教材の名前"
            name="name"
            type="text"
            margin="dense"
            autoFocus
            // placeholder="教材の名前"
            // rows="2"
            value={value.name}
            onChange={onChangeName}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            id="description"
            label="教材の説明文"
            type="description"
            name="description"
            // placeholder="教材の説明文"
            multiline
            rows="4"
            margin="dense"
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
                      src={value.image}
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
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <div>
                  <Box>
                    <Box sx={{ height: 0, textAlign: "right" }}>
                      <IconButton onClick={onClickResetFile}>
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

          {/* 一度押したら画面遷移するまで押せない仕様に */}
          <Button
            type="submit"
            variant="outlined"
            startIcon={startIcon}
            size="large"
            fullWidth
            color="primary"
            disabled={disabled}
          >
            {children}
          </Button>
        </Card>
      </form>
    </>
  );
};
