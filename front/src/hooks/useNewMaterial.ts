import { useState } from "react";
import { useHistory } from "react-router-dom";

import { createMaterial } from "lib/api/material";
import { useImageUpload } from "hooks/useImageUpload";
import { useSnackbar } from "providers/SnackbarProvider";

// 教材新規投稿における状態管理や処理をまとめたカスタムフック
export const useNewMaterial = () => {
  const history = useHistory();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { showSnackbar } = useSnackbar();

  const { image, preview, uploadImage, resetFile } = useImageUpload();

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
      const res = await createMaterial(data);
      console.log(data, res);

      history.push("/materials");
      showSnackbar("教材を登録しました", "success");
    } catch (e) {
      showSnackbar("教材を登録できませんでした", "error");
      console.log(e);
    }
  };

  return {
    name,
    setName,
    description,
    setDescription,
    image,
    preview,
    uploadImage,
    resetFile,
    handleCreatePost,
    isDisabled: !name || !description || !image,
  };
};
