import { FC, memo, useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { MaterialType } from "types/api/materialType";
import { deleteMaterial, getDetailMaterial } from "lib/api/material";
import { useSnackbar } from "providers/SnackbarProvider";

import { AuthContext } from "providers/AuthProvider";
import { LikeButton } from "components/molecules/LikeButton";
import { createLike, deleteLike } from "lib/api/like";
import { Like } from "types/api/like";
// import { likedCheck } from "lib/api/like";

export const MaterialDetail: FC = memo(() => {
  const { currentUser } = useContext(AuthContext);
  // 教材の情報はdataとなっている
  const [data, setData] = useState<MaterialType>();
  // const [value, setValue] = useState({
  //   id: 0,
  //   content: "",
  //   likes: [],
  // });
  const [likes, setLikes] = useState<Like[]>();
  const { showSnackbar } = useSnackbar();
  // const [likeCount, setLikeCount] = useState(0);

  // hooksとしてlikeも追加したほうが、asyncの記述が1箇所で収まるのでhooksとしてlikeの処理を収めるようにするほうが良い？

  // { id = 1 } を取得する
  const query = useParams();

  const history = useHistory();

  //一覧画面で選択された教材のidに紐づいたデータを取得
  // likeやcommentのコンポーネントでも使用するため、hook化する？
  // 一覧画面では、mapを使うことでひとつ一つのlikeの情報を表示できるためquery使ってidを特定する必要はない？からhook化しなくてもいい？
  //教材詳細API
  const getDetail = async (query) => {
    try {
      const res = await getDetailMaterial(query.id);
      console.log(res.data);
      setData(res.data);
      // setValue({
      //   id: res.data.id,
      //   content: res.data.content,
      //   likes: [],
      // });
      setLikes(res.data.likes);
    } catch (e) {
      console.log(e);
    }
  };

  // 削除ボタン
  const onClickDelete = async (item) => {
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

  //いいね機能
  // いいね機能関数
  const handleCreateLike = async (item) => {
    try {
      const res = await createLike(item.id);
      console.log(res.data);
      getDetailMaterial(item);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteLike = async (item) => {
    try {
      const res = await deleteLike(item.id);
      console.log(res.data);
      getDetailMaterial(item);
    } catch (e) {
      console.log(e);
    }
  };

  // const handleGetLike = async (query) => {
  //   const res = await likedCheck(query.id);
  //   setLikeCount(res.data.likeCount);
  // };

  // 画面描画時にidがundefinedだとデータ取得ができないので、
  // 依存配列にidを入れてidがundefined => 1 と更新された時に
  // useEffectの副作用を使って処理をもう一度実行させる
  useEffect(() => {
    getDetail(query);
    // handleGetLike(query);
  }, [query]);

  return (
    <>
      {/* useStateによってdataに値がsetされていないタイミングでDOMを形成し、クラッシュするのを防ぐためにオプショナルチェーンを挿入 */}
      <p>教材詳細ページです</p>
      <div>教材のID:{data?.id}</div>
      <div>名前:{data?.name}</div>
      <div>説明:{data?.description}</div>
      <div>作成者ID:{data?.userId}</div>
      <div>
        {/* <LikeButton
          materialId={data?.id}
          currentUser={currentUser}
          initialLikeCount={likeCount}
        /> */}
      </div>
      {/* <div>
        {likes?.find((like) => like.userId === currentUser.id) ? (
          <p onClick={() => handleDeleteLike(value)}>♡{likes?.length}</p>
        ) : (
          <p onClick={() => handleCreateLike(value)}>♡{likes?.length}</p>
        )}
      </div> */}
      <div>
        {likes?.find((like) => like.userId === currentUser.id) ? (
          <p onClick={() => handleDeleteLike(data)}>♡{likes?.length}</p>
        ) : (
          <p onClick={() => handleCreateLike(data)}>♡{likes?.length}</p>
        )}
      </div>

      <button onClick={() => history.goBack()}>戻る</button>
      <button onClick={() => console.log(data)}>こんソール</button>
      <button onClick={() => history.push("/materials/new")}>新規登録</button>

      {/* ログインユーザーのIDと教材のユーザーIDが一致している場合に編集を表示  */}
      {/* {currentUser.id === data?.userId ? (
        <Link to={`/materials/edit/${data?.id}`}>編集</Link>
      ) : (
        <></>
      )} */}
      {/* ログインユーザーのIDと教材のユーザーIDが一致している場合に削除ボタンを表示  */}
      {/* {currentUser.id === data?.userId ? (
        <button onClick={() => onClickDelete(data)}>削除</button>
      ) : (
        <></>
      )} */}
    </>
  );
});
