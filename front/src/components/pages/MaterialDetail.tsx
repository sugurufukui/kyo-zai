import { FC, memo, useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { MaterialType } from "types/api/materialType";
import { deleteMaterial, getDetailMaterial } from "lib/api/material";
import { useSnackbar } from "providers/SnackbarProvider";
// import { useAllMaterials } from "hooks/useAllMaterials";
// import { ListTable } from "components/templates/ListTable";
import { AuthContext } from "providers/AuthProvider";

export const MaterialDetail: FC = memo(() => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState<MaterialType>();
  // const { getMaterials, materials, loading } = useAllMaterials();
  const { showSnackbar } = useSnackbar();

  // { id = 1 } を取得する
  const query = useParams();

  const history = useHistory();

  // 削除ボタン押下時
  const onClickDelete = async (data) => {
    // ローディングスタート
    console.log("click", data.id);
    try {
      const res = await deleteMaterial(data.id);
      // 削除後に一覧ページに遷移する
      history.push("/materials");
      // 削除の前に確認ボタンが欲しい「削除してもいいですか？」
      // muiのDialogのアラートを参照する
      showSnackbar("削除しました", "success");
    } catch (e) {
      console.log(e);
      showSnackbar("削除に失敗しました。", "error");
    } finally {
      // ローディング停止
    }
  };

  // 画面描画時にidがundefinedだとデータ取得ができないので、
  // 依存配列にidを入れてidがundefined => 1 と更新された時に
  // useEffectの副作用を使って処理をもう一度実行させる
  useEffect(() => {
    getDetail(query);
  }, [query]);

  //一覧画面で選択された教材のidに紐づいたデータを取得
  const getDetail = async (query) => {
    try {
      const res = await getDetailMaterial(query.id);
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {/* useStateによってdataに値がsetされていないタイミングでDOMを形成し、クラッシュするのを防ぐためにオプショナルチェーンを挿入 */}
      <p>教材詳細ページです</p>
      <div>教材のID:{data?.id}</div>
      <div>名前:{data?.name}</div>
      <div>説明:{data?.description}</div>
      <div>作成者ID:{data?.userId}</div>

      <button onClick={() => history.goBack()}>戻る</button>
      <button onClick={() => console.log(data)}>コンソー</button>

      {/* <ListTable
        materials={materials}
        currentUser={currentUser}
        onClickDelete={() => onClickDelete(materials)}
      /> */}
      <button onClick={() => history.push("/materials/new")}>新規登録</button>

      {/* 実験用に設置（後で削除する） */}
      <table>
        <thead>
          <tr>
            <th>名前</th>
            <th>説明</th>
            <th>下に編集ボタン</th>
            <th>下に詳細ボタン</th>
            <th>下に削除ボタン</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data?.name}</td>
            <td>{data?.description}</td>
            <td>
              <Link to={`materials/edit/${data?.id}`}>編集</Link>
            </td>
            <td>
              <Link to={`/materials/${data?.id}`}>詳細へ</Link>
            </td>
            <td>
              <button onClick={() => onClickDelete(data)}>削除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      {/* ログインユーザーのIDと教材のユーザーIDが一致している場合に編集・削除ボタンを表示させたい！！ */}
      <table>
        <thead>
          <tr>
            <th>名前</th>
            <th>説明</th>
            <th>下に編集ボタン</th>
            <th>下に詳細ボタン</th>
            <th>下に削除ボタン</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data?.name}</td>
            <td>{data?.description}</td>

            {currentUser.id === data?.userId ? (
              <td>
                <Link to={`/materials/edit/${data?.id}`}>編集</Link>
              </td>
            ) : (
              <td>違うユーザーなので編集ボタンでない</td>
            )}
            <td>
              <Link to={`/materials/${data?.id}`}>詳細へ</Link>
            </td>
            {currentUser.id === data?.userId ? (
              <td>
                <button onClick={() => onClickDelete(data)}>削除</button>
              </td>
            ) : (
              <td>違うユーザーなので削除ボタンでない</td>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
});
