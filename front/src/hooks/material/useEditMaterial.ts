import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getDetailMaterial, updateMaterial } from "lib/api/material";
import { useImageUpload } from "hooks/material/useImageUpload";
import { AuthContext } from "providers/AuthProvider";
import { useSnackbar } from "providers/SnackbarProvider";
// 教材の編集における状態管理や処理をまとめたカスタムフック
export const useEditMaterial = () => {
  const history = useHistory();
  const query = useParams<{ id: string }>();
  const [value, setValue] = useState({
    name: "",
    description: "",
    image: undefined,
  });

  const { currentUser } = useContext(AuthContext);
  const { showSnackbar } = useSnackbar();

  const { image, preview, uploadImage, resetFile } = useImageUpload();

  useEffect(() => {
    handleGetData(query);
  }, [query]);

  // idをapiクライアントに渡し、/api/v1/material/:idのエンドポイントからデータ取得
  const handleGetData = async (query) => {
    try {
      const res = await getDetailMaterial(query.id);
      console.log("res.data", res.data);
      console.log("res.data.image.url", res.data.image.url);
      // 他のユーザーの教材編集画面には推移させない
      if (currentUser.id == res.data.userId) {
        // 使う値のみstateにセットする
        setValue({
          name: res.data.name,
          description: res.data.description,
          image: res.data.image.url,
        });
      } else {
        history.push("/");
        showSnackbar("他のユーザーが作成した教材は編集できません", "error");
      }
    } catch (e) {
      console.log(e);
      showSnackbar("その教材は存在しません", "error");
      history.push("/notfound404");
    }
  };

  // テキストフィールドの変更を検知し値を書き換えstateで管理
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    console.log("value", value);
    console.log("e.target.name", e.target.name);
  };

  // FormData形式でデータを編集
  const updateFormData = (): FormData => {
    const formData = new FormData();
    // formDataにvalue内のnameとdescription、stateのimageを代入
    formData.append("name", value.name);
    formData.append("description", value.description);
    if (image) formData.append("image", image);
    console.log("image", image);
    return formData;
  };

  // 教材データ更新
  const handleUpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 上で定義して3つの情報が入った入ったformDataをdataに代入
      const data = updateFormData();
      // paramsの値にdata=formDataの値を代入
      const res = await updateMaterial(query.id, data);
      console.log(res);
      history.push(`/materials/${query.id}`);
      showSnackbar("教材を編集しました", "success");
    } catch (e) {
      console.log(e);
    }
  };

  return {
    value,
    setValue,
    image,
    preview,
    handleChange,
    uploadImage,
    resetFile,
    handleUpdatePost,
  };
};
