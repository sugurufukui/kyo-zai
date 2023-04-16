import { FC, memo, useCallback, useState } from "react";
import { MaterialFormBody } from "components/organisms/material/MaterialFormBody";
import { createMaterial } from "lib/api/material";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "providers/SnackbarProvider";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Button } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { resizeImage } from "lib/imageResizeUtil";

export const New: FC = memo(() => {
  const history = useHistory();
  const [value, setValue] = useState([]);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<
    string | ArrayBuffer | null | undefined
  >(undefined);

  const { showSnackbar } = useSnackbar();

  // 画像選択機能
  const uploadImage = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file.type.includes("image/")) {
      setImage(null);
      showSnackbar("そのファイルは登録できません", "error");
      return;
    }

    try {
      const resizedImage = await resizeImage(file, 1024, 1024);
      setImage(resizedImage);
      setPreview(window.URL.createObjectURL(resizedImage));
    } catch (error) {
      showSnackbar("画像のリサイズに失敗しました。", "error");
    }
  }, []);

  // 画像選択取り消し
  const resetFile = useCallback(() => {
    setImage(null);
    setPreview(null);
    console.log(image, preview);
  }, []);

  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);
    return formData;
  };

  // 教材新規登録
  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = createFormData();
      console.log(data);
      const res = await createMaterial(data);
      console.log(res);

      history.push("/materials");
      showSnackbar("教材を登録しました", "success");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MaterialFormBody
        title="教材新規作成"
        onClickSubmit={handleCreatePost}
        value={value}
        children="教材を登録する"
        startIcon={<PostAddIcon />}
        onChangeName={(e: React.ChangeEvent<HTMLInputElement>) => {
          const name = e.target.value;
          setName(name);
          setValue((prev) => ({ ...prev, name }));
        }}
        onChangeDescription={(e: React.ChangeEvent<HTMLInputElement>) => {
          const description = e.target.value;
          setDescription(description);
          setValue((prev) => ({ ...prev, description }));
        }}
        onChangeImage={uploadImage}
        onClickResetFile={resetFile}
        image={image}
        preview={preview}
        disabled={!name || !description || !image}
      />
      <Button
        variant="contained"
        startIcon={<ReplyIcon />}
        onClick={() => history.goBack()}
      >
        戻る
      </Button>
    </>
  );
});
