import { getDetailMaterial, updateMaterial } from "lib/api/material";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { MaterialFormBody } from "components/organisms/material/MaterialFormBody";
import { useHistory, useParams } from "react-router-dom";
import { useSnackbar } from "providers/SnackbarProvider";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";

import { Button } from "@mui/material";

export const Edit: FC = memo(() => {
  // 一覧からreact-router-domを使ってidを取得
  const query = useParams<{ id: string }>();
  // apiで取得したデータを管理するためのstate
  const [value, setValue] = useState({
    name: "",
    description: "",
    image: undefined,
  });

  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<
    string | ArrayBuffer | null | undefined
  >(undefined);

  const history = useHistory();
  const { showSnackbar } = useSnackbar();

  // 画面が描画されたときとqueryが更新された時にデータを取得する関数を実行
  useEffect(() => {
    handleGetData(query);
  }, [query]);

  // idをapiクライアントに渡し、/api/v1/material/:idのエンドポイントからデータ取得
  const handleGetData = async (query) => {
    try {
      const res = await getDetailMaterial(query.id);
      console.log("res.data", res.data);
      console.log("res.data.image.url", res.data.image.url);

      // 使う値のみstateにセットする
      setValue({
        name: res.data.name,
        description: res.data.description,
        image: res.data.image.url,
      });
    } catch (e) {
      console.log(e);
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

  // 画像選択機能
  const uploadImage = useCallback(
    (e) => {
      const file = e.target.files[0];
      // image以外のファイルはnullにしてプレビューさせずにアラート表示;
      if (file.type.includes("image/")) {
        setImage(file);
        console.log("file", file);
      } else {
        setImage(null);
        showSnackbar("そのファイルは登録できません", "error");
        return;
      }
    },
    [showSnackbar]
  );

  // プレビュー機能
  const previewImage = useCallback((e) => {
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    console.log("file", file);
  }, []);

  // 画像選択取り消し
  const resetFile = useCallback(() => {
    setImage(null);
    setPreview(null);
    console.log("image", image);
    console.log("preview", preview);
  }, [image, preview]);

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

  // 更新ボタン押下後、idとparameterをapiクライアントに渡し、リクエストを投げる
  const handleUpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 上で定義して3つの情報が入った入ったformDataをdataに代入
      const data = updateFormData();
      // paramsの値にdata=formDataの値を代入
      const res = await updateMaterial(query.id, data);
      console.log(res);
      // リクエストが成功したら一覧画面に推移
      history.push("/materials");
      showSnackbar("教材を編集しました", "success");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MaterialFormBody
        title="教材編集"
        onClickSubmit={handleUpdatePost}
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
          previewImage(e);
          handleChange(e);
        }}
        onClickResetFile={resetFile}
        preview={preview}
        disabled={!value}
      />

      <Button
        variant="outlined"
        startIcon={<ReplyIcon />}
        onClick={() => history.goBack()}
      >
        戻る
      </Button>
    </>
  );
});
