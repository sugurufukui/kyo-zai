import { FC, memo } from "react";
import { useHistory } from "react-router-dom";

import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import { Button } from "@mui/material";

import { MaterialFormBody } from "components/organisms/material/MaterialFormBody";
import { useEditMaterial } from "hooks/useEditMaterial";

export const Edit: FC = memo(() => {
  const { value, preview, handleChange, uploadImage, resetFile, handleUpdatePost } =
    useEditMaterial();

  const history = useHistory();

  return (
    <>
      <MaterialFormBody
        title="教材編集"
        onClickSubmit={(e) => {
          handleUpdatePost(e);
        }}
        value={value}
        children="教材の編集を完了する"
        startIcon={<AutorenewOutlinedIcon />}
        onChangeName={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
        onChangeDescription={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
        onChangeImage={(e: React.ChangeEvent<HTMLInputElement>) => {
          uploadImage(e);
          handleChange(e);
        }}
        onClickResetFile={resetFile}
        preview={preview}
        disabled={!value}
      />

      <Button variant="contained" startIcon={<ReplyIcon />} onClick={() => history.goBack()}>
        戻る
      </Button>
    </>
  );
});
