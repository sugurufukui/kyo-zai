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
    preview: "",
    image: undefined,
  });

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
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
      // dataの中にurlの情報が入っている　http://localhost:3001/uploads/material/image/10/img_kyoto.jpeg
      console.log("res.data.image.url", res.data.image.url);

      // 使う値のみstateにセットする
      setValue({
        name: res.data.name,
        description: res.data.description,
        preview: res.data.preview,
        image: res.data.image,
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
    console.log("e.target.name", e.target.name); //nameとdescription入力時には、e.target.nameとして、ここにそれぞれ、nameとdescriptionが表示される。image追加時には、e.target.nameにはなにも入っていないようで、なにも表示されない。
  };

  // 仮で設置した（formからの引用）
  // 画像選択機能
  const uploadImage = useCallback(
    (e) => {
      const file = e.target.files[0];
      // image以外のファイルはnullにしてプレビューさせずにアラート表示;
      if (file.type.includes("image/")) {
        setImage(file);
        console.log("file", file);
        console.log("image", image);
      } else {
        setImage(null);
        showSnackbar("そのファイルは登録できません", "error");
        return;
      }
    },
    [setImage, showSnackbar, image]
  );

  // プレビュー機能
  const previewImage = useCallback(
    (e) => {
      const file = e.target.files[0];
      setPreview(window.URL.createObjectURL(file));
      console.log("file", file);
      console.log("value.preview", value.preview);
    },
    [value.preview]
  );

  // 元のやつ
  // // // 更新ボタン押下後、idとparameterをapiクライアントに渡し、リクエストを投げる
  // const handleUpdatePost = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await updateMaterial(query.id, value);
  //     console.log(res);
  //     // リクエストが成功したら一覧画面に推移
  //     history.push("/materials");
  //     showSnackbar("編集しました", "success");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // FormData形式でデータを編集
  const updateFormData = (): FormData => {
    const formData = new FormData();

    // formData.set("name", name);
    // formData.set("description", description);
    // if (image) formData.set("image", image);
    // console.log("image", image);

    // formData.append("name", name);
    // formData.append("description", description);
    if (image) formData.append("image", image);
    return formData;
  };

  // 編集中
  // 更新ボタン押下後、idとparameterをapiクライアントに渡し、リクエストを投げる
  // 教材更新時(初期で教材の情報が入っている状態にしたい)
  const handleUpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = updateFormData();
      console.log(data);
      const res = await updateMaterial(query.id, value);
      console.log(res);
      // setPreview("");
      // setImage(undefined);
      // リクエストが成功したら一覧画面に推移
      history.push("/materials");
      showSnackbar("編集しました", "success");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <p>編集画面です</p>
      <MaterialFormBody
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
          uploadImage(e); //「教材の写真を選択」ボタンを押すと、ファイル選択画面が出る。setImageにFileをセットする
          previewImage(e); //ファイル選択画面から画像を選択すると、プレビュー表示される
          handleChange(e); //ファイルから画像を選択するたびに、valueの値を更新（更新できておらず、consoleの値は、なし）
        }}
        image={image}
        setImage={setImage}
        preview={preview}
        setPreview={setPreview}
        disabled={!value}
      />
      <Button variant="outlined" startIcon={<DeleteIcon />} color="error">
        削除する
      </Button>
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
