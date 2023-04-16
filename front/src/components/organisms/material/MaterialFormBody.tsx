import React, { FC, ReactNode, useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Box } from "@mui/system";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";

import { grey } from "@mui/material/colors";
import { DeleteMaterialModal } from "components/molecules/DeleteMaterialModal";

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

  const query: any = useParams();

  //削除確認用ダイアログ用
  const [open, setOpen] = useState(false);
  const deleteDialogClose = () => {
    setOpen(false);
  };
  const deleteDialogOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <form autoComplete="off" onSubmit={onClickSubmit}>
        <Card sx={{ p: 4, borderRadius: "md" }}>
          <CardHeader sx={{ textAlign: "center" }} title={title} />
          <Divider sx={{ my: 2 }} />
          <TextField
            variant="outlined"
            fullWidth
            id="name"
            label="教材の名前"
            value={value.name}
            type="text"
            name="name"
            multiline
            margin="dense"
            onChange={onChangeName}
            autoFocus
          />
          <TextField
            variant="outlined"
            fullWidth
            id="description"
            label="教材の説明文"
            value={value.description}
            type="description"
            name="description"
            multiline
            minRows={4}
            margin="dense"
            onChange={onChangeDescription}
          />
          <div>
            {/* 編集時に変更前の写真を表示 */}
            {value.image ? (
              <Box sx={{ mt: 1 }}>
                <Typography fontWeight="bold" color="gray" variant="subtitle2">
                  現在使用している写真
                </Typography>
                <div>
                  <Box textAlign="center" sx={{ pt: 2 }}>
                    <img
                      src={value.image}
                      alt="変更前の写真"
                      style={{
                        maxWidth: "100%",
                        maxHeight: 260,
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </div>
                <Box sx={{ m: 4, height: 0, textAlign: "center" }}>
                  <KeyboardDoubleArrowDownRoundedIcon fontSize="large" />
                </Box>
              </Box>
            ) : (
              <></>
            )}
          </div>
          {/* 新規投稿時、編集時共に新しい画像を未選択時には選択ボタン表示。選択後は非表示*/}
          <div>
            {!preview ? (
              <Box sx={{ mt: 1 }}>
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
                    <Typography
                      fontWeight="bold"
                      color="gray"
                      variant="subtitle2"
                    >
                      教材の写真を選択
                    </Typography>
                  </IconButton>

                  <Box
                    textAlign="center"
                    sx={{
                      pt: 2,
                      height: 260,
                      backgroundColor: "#EDF2F7",
                      ":hover": { cursor: "pointer" },
                    }}
                  >
                    <Paper elevation={3} />
                  </Box>
                </label>
              </Box>
            ) : (
              <Box sx={{ mt: 1 }}>
                <Typography fontWeight="bold" color="gray" variant="subtitle2">
                  新しい写真
                </Typography>
                {isLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <div>
                    <Box>
                      <Box sx={{ height: 0, textAlign: "right" }}>
                        <IconButton onClick={onClickResetFile}>
                          <HighlightOffIcon
                            fontSize="large"
                            sx={{ color: grey[800] }}
                          />
                        </IconButton>
                      </Box>
                      <Box textAlign="center">
                        <img
                          src={preview}
                          alt="preview img"
                          style={{
                            maxWidth: "100%",
                            maxHeight: 260,
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                    </Box>
                  </div>
                )}
              </Box>
            )}
          </div>

          {/* 一度押したら画面遷移するまで押せない仕様に */}
          <Box sx={{ flexGrow: 1, mt: 3 }}>
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
          </Box>
          {value.image ? (
            <>
              <Box sx={{ flexGrow: 1, mt: 3 }}>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<DeleteIcon />}
                  fullWidth
                  color="error"
                  onClick={() => deleteDialogOpen()}
                >
                  削除する
                </Button>
              </Box>
              <DeleteMaterialModal
                open={open}
                handleClose={deleteDialogClose}
                item={query}
              />
            </>
          ) : (
            <></>
          )}
        </Card>
      </form>
    </>
  );
};
