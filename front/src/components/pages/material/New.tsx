import { FC, memo, useCallback, useState } from "react";
import { MaterialFormBody } from "components/organisms/material/MaterialFormBody";
import { createMaterial } from "lib/api/material";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "providers/SnackbarProvider";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Button } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";

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
  const uploadImage = useCallback((e) => {
    const file = e.target.files[0];
    // image以外のファイルはnullにしてプレビューさせずにアラート表示;
    if (file.type.includes("image/")) {
      setImage(file);
      console.log(file);
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
    console.log(preview);
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
        onClickSubmit={(e) => {
          e.preventDefault(); // フォームの送信をブロック
          if (name.length <= 30 && description && image) {
            handleCreatePost(e);
          } else {
            showSnackbar("名前は30文字以内で作成してください", "error");
          }
        }}
        value={value}
        children="教材を登録する"
        startIcon={<PostAddIcon />}
        onChangeName={(e: React.ChangeEvent<HTMLInputElement>) => {
          const name = e.target.value;
          if (name.length <= 30) {
            setName(name);
            setValue((prev) => ({ ...prev, name }));
          } else {
            // 入力した内容を保存して31文字以上は入力できないようにする
            const prevName = name.slice(0, 30); // 入力文字列の先頭から30文字を抜き出す
            setName(prevName);
            setValue((prev) => ({ ...prev, name: prevName }));
          }
        }}
        onChangeDescription={(e: React.ChangeEvent<HTMLInputElement>) => {
          const description = e.target.value;
          setDescription(description);
          setValue((prev) => ({ ...prev, description }));
        }}
        onChangeImage={(e: React.ChangeEvent<HTMLInputElement>) => {
          uploadImage(e);
          previewImage(e);
        }}
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
