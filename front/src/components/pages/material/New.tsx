import { FC, memo, useCallback, useState } from "react";
import { MaterialFormBody } from "components/organisms/material/MaterialFormBody";
import { createMaterial } from "lib/api/material";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "providers/SnackbarProvider";
import PostAddIcon from "@mui/icons-material/PostAdd";

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

  // // 画像選択機能
  // const uploadImage = useCallback((e) => {
  //   const file = e.target.files[0];
  //   // image以外のファイルはnullにしてプレビューさせずにアラート表示;

  //   if (file.type.includes("image/")) {
  //     setImage(file);
  //     console.log(file);
  //   } else {
  //     setImage(null);
  //     showSnackbar("そのファイルは登録できません", "error");
  //     return;
  //   }
  // }, []);

  // // プレビュー機能
  // const previewImage = useCallback((e) => {
  //   const file = e.target.files[0];
  //   setPreview(window.URL.createObjectURL(file));
  //   console.log(file);
  //   console.log(preview);
  // }, []);

  // // 画像選択取り消し
  // const resetFile = useCallback(() => {
  //   setImage(null);
  //   setPreview(null);
  //   console.log(image, preview);
  // }, []);

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
      // setName("");
      // setDescription("");
      // setPreview("");
      // setImage(undefined);
      // console.log(name);
      // console.log(description);
      // console.log(image);
      // console.log(value);

      history.push("/materials");
      showSnackbar("教材を登録しました", "success");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <MaterialFormBody
        onClickSubmit={handleCreatePost}
        value={value}
        children="教材を登録する"
        startIcon={<PostAddIcon />}
        // resetFile={resetFile}
        // onChangeFileInput={(e: React.ChangeEvent<HTMLInputElement>) => {
        // uploadImage(e);
        // previewImage(e);
        // }}
        onChangeName={(e: React.ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
        }}
        onChangeDescription={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDescription(e.target.value);
        }}
        image={image}
        setImage={setImage}
        preview={preview}
        setPreview={setPreview}
        disabled={!name || !description || !image}
      />
      <button onClick={() => history.goBack()}>戻る</button>
    </>
  );
});
