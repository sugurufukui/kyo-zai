import { FC, memo } from "react";
import { useHistory } from "react-router-dom";

import PostAddIcon from "@mui/icons-material/PostAdd";
import ReplyIcon from "@mui/icons-material/Reply";
import { Button } from "@mui/material";

import { MaterialFormBody } from "components/organisms/material/MaterialFormBody";
import { useNewMaterial } from "hooks/useNewMaterial";

// 教材新規登録ページ
export const New: FC = memo(() => {
  const {
    name,
    setName,
    description,
    setDescription,
    image,
    preview,
    uploadImage,
    resetFile,
    handleCreatePost,
    isDisabled,
  } = useNewMaterial();

  const history = useHistory();

  return (
    <>
      <MaterialFormBody
        title="教材新規作成"
        onClickSubmit={handleCreatePost}
        value={{ name, description }}
        children="教材を登録する"
        startIcon={<PostAddIcon />}
        onChangeName={(e: React.ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
        }}
        onChangeDescription={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDescription(e.target.value);
        }}
        onChangeImage={uploadImage}
        onClickResetFile={resetFile}
        image={image}
        preview={preview}
        disabled={isDisabled}
      />
      <Button variant="contained" startIcon={<ReplyIcon />} onClick={() => history.goBack()}>
        戻る
      </Button>
    </>
  );
});
