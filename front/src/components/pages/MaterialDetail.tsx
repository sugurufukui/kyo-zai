import { FC, memo, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { MaterialType } from "types/api/materialType";
import { getDetailMaterial } from "lib/api/material";

export const MaterialDetail: FC = memo(() => {
  const [data, setData] = useState<MaterialType>();
  // { id = 1 } を取得する
  const query = useParams();

  const history = useHistory();

  // 画面描画時にidがundefinedだとデータ取得ができないので、
  // 依存配列にidを入れてidがundefined => 1 と更新された時に
  // useEffectの副作用を使って処理をもう一度実行させる
  useEffect(() => {
    getDetail(query);
  }, [query]);

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
      {/* Property 'name' does not exist on type 'any[]'.というエラー */}
      <p>教材詳細ページです</p>
      <div>ID:{data.id}</div>
      <div>名前:{data.name}</div>
      <div>説明:{data.description}</div>
      <button onClick={() => history.goBack()}>戻る</button>
    </>
  );
});
