import { FC, memo, useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { MaterialType } from "types/api/materialType";
import { deleteMaterial, getDetailMaterial } from "lib/api/material";
import { useSnackbar } from "providers/SnackbarProvider";

import { AuthContext } from "providers/AuthProvider";
import { LikeButton } from "components/molecules/LikeButton";

import { likedCheck } from "lib/api/like";
import { useLike } from "hooks/useLike";

type Props = {
  initialLikeCount: number;
};

export const Detail: FC<Props> = memo((props) => {
  const { initialLikeCount } = props;
  const history = useHistory();

  // { id = 1 } を取得する
  const query: any = useParams();

  const [value, setValue] = useState({
    id: 0,
    name: "",
    description: "",
    userId: 0,
  });

  // // いいねの数の情報
  // const [likeCount, setLikeCount] = useState(0);

  const { currentUser } = useContext(AuthContext);
  const { showSnackbar } = useSnackbar();
  const { handleGetLike, likeCount } = useLike(props);

  //教材詳細API(materials_controllerのshowの中のjsonの内容を引用)
  const getDetail = async (query: any) => {
    try {
      const res = await getDetailMaterial(query.id);
      console.log(res.data);
      setValue({
        id: res.data.id,
        name: res.data.name,
        description: res.data.description,
        userId: res.data.userId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  // 削除ボタン
  const onClickDelete = async (item: MaterialType) => {
    // ローディングスタート
    console.log("click", item.id);
    try {
      const res = await deleteMaterial(item.id);
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
    handleGetLike();
  }, [query]);

  return (
    <>
      {/* useStateによってdataに値がsetされていないタイミングでDOMを形成し、クラッシュするのを防ぐためにオプショナルチェーンを挿入 */}
      <p>教材詳細ページです</p>
      <div>教材のID:{value?.id}</div>
      <div>名前:{value?.name}</div>
      <div>説明:{value?.description}</div>
      <div>作成者ID:{value?.userId}</div>

      <LikeButton
        // materialId={query.id}
        // currentUser={currentUser}
        initialLikeCount={likeCount}
      />

      <button onClick={() => history.goBack()}>戻る</button>
      <button onClick={() => console.log(value)}>valueの値</button>
      <button onClick={() => console.log(query)}>queryの値</button>
      <button onClick={() => console.log(likeCount)}>likeの値</button>

      <button onClick={() => history.push("/materials/new")}>新規登録</button>

      {/* ログインユーザーのIDと教材のユーザーIDが一致している場合に編集を表示  */}
      {currentUser.id === value?.userId ? (
        <Link to={`/materials/edit/${value?.id}`}>編集</Link>
      ) : (
        <></>
      )}
      {/* ログインユーザーのIDと教材のユーザーIDが一致している場合に削除ボタンを表示  */}

      {currentUser.id === value.userId ? (
        <button onClick={() => onClickDelete(query)}>削除</button>
      ) : (
        <></>
      )}
    </>
  );
});
