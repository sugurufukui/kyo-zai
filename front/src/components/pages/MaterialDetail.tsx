import { FC, memo, useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { MaterialType } from "types/api/materialType";
import { deleteMaterial, getDetailMaterial } from "lib/api/material";
import { useSnackbar } from "providers/SnackbarProvider";

import { AuthContext } from "providers/AuthProvider";

export const MaterialDetail: FC = memo(() => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState<MaterialType>();
  const { showSnackbar } = useSnackbar();

  // { id = 1 } を取得する
  const query = useParams();

  const history = useHistory();

  // 削除ボタン
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
  // likeやcommentのコンポーネントでも使用するため、hook化する？
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
      <button onClick={() => history.push("/materials/new")}>新規登録</button>

      {/* ログインユーザーのIDと教材のユーザーIDが一致している場合に編集を表示  */}
      {currentUser.id === data?.userId ? (
        <Link to={`/materials/edit/${data?.id}`}>編集</Link>
      ) : (
        <></>
      )}
      {/* ログインユーザーのIDと教材のユーザーIDが一致している場合に削除ボタンを表示  */}
      {currentUser.id === data?.userId ? (
        <button onClick={() => onClickDelete(data)}>削除</button>
      ) : (
        <></>
      )}
    </>
  );
});
