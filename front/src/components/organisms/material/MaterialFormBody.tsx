import React, { FC, ReactNode, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Card, CardHeader, Divider, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";

import { DeleteMaterialModal } from "components/molecules/material/DeleteMaterialModal";
import { ExistingImage } from "components/molecules/material/ExistingImage";
import { UploadImageButton } from "components/molecules/material/UploadImageButton";

type Props = {
  title: string;
  value: any;
  onClickSubmit: (e) => void;
  children: ReactNode;
  onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (event: React.ChangeEvent<HTMLInputElement>) => void;
  image?: File;
  preview: any;
  disabled: boolean;
  onChangeImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  startIcon: React.ReactNode;
  onClickResetFile: () => void;
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

          {/* 編集時に変更前の写真を表示 */}
          <Box>{value.image ? <ExistingImage image={value.image} /> : null}</Box>

          {/* 写真登録 */}
          <UploadImageButton
            preview={preview}
            isLoading={isLoading}
            onChangeImage={onChangeImage}
            onClickResetFile={onClickResetFile}
          />

          {/* 編集ボタン */}
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

          {/* 削除ボタン */}
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
              <DeleteMaterialModal open={open} handleClose={deleteDialogClose} item={query} />
            </>
          ) : null}
        </Card>
      </form>
    </>
  );
};
