import { getDetailMaterial, updateMaterial } from "lib/api/material";
import { FC, memo, useEffect, useState } from "react";
import { MaterialFormBody } from "components/pages/MaterialFormBody";
import { useHistory, useParams } from "react-router-dom";
import { useSnackbar } from "providers/SnackbarProvider";

export const MaterialEdit: FC = memo(() => {
  // 一覧からreact-router-domを使ってidを取得
  const query = useParams<{ id: string }>();
  // apiで取得したデータを管理するためのstate
  const [value, setValue] = useState({
    name: "",
    description: "",
  });

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
      console.log(res.data);
      // 使う値のみstateにセットする
      setValue({
        name: res.data.name,
        description: res.data.description,
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
  };

  // 更新ボタン押下後、idとparameterをapiクライアントに渡し、リクエストを投げる
  const onClickSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateMaterial(query.id, value);
      console.log(res);
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
        handleChange={handleChange}
        onClickSubmit={onClickSubmit}
        value={value}
        buttonType="更新"
      />
      <button onClick={() => history.goBack()}>戻る</button>
    </>
  );
});
