import React, { FC } from "react";

import { Box, Typography, IconButton, CircularProgress, Paper } from "@mui/material";
import { grey } from "@mui/material/colors";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type Props = {
  preview: string | null;
  isLoading: boolean;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickResetFile: () => void;
};

// 新規投稿&編集時に新しい画像を未選択時には画像変更ボタンを表示。選択後には非表示するコンポーネント
export const UploadImageButton: FC<Props> = (props) => {
  const { preview, isLoading, onChangeImage, onClickResetFile } = props;

  if (!preview) {
    return (
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
            <Typography fontWeight="bold" color="gray" variant="subtitle2">
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
    );
  } else {
    return (
      <Box sx={{ mt: 1 }}>
        <Typography fontWeight="bold" color="gray" variant="subtitle2">
          新しい写真
        </Typography>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <Box sx={{ height: 0, textAlign: "right" }}>
              <IconButton onClick={onClickResetFile}>
                <HighlightOffIcon fontSize="large" sx={{ color: grey[800] }} />
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
        )}
      </Box>
    );
  }
};
