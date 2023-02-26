import { createLike, deleteLike, likedCheck } from "lib/api/like";
import { useCallback, useContext, useEffect, useState } from "react";

import _ from "lodash";
import { AuthContext } from "providers/AuthProvider";
import { useAllMaterials } from "hooks/useAllMaterials";
import { Box } from "@mui/material";
import { MaterialType } from "types/api/materialType";
import { getMyMaterial } from "lib/api/material";

type Props = {
  initialLikeCount: number;
};
// 使用していないコンポーネント
// いいねの追加、確認、削除データを取得するカスタムフック
export const useLike = (props: Props) => {
  // いいね数の変数を用意
  const { initialLikeCount } = props;
  //いいねの🤍の色を管理
  const [liked, setLiked] = useState(false);
  //いいねの数を管理
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  // 誰がどの教材にいいねしたのか
  const [likeData, setLikeData] = useState({
    userId: 0,
    materialId: 0,
  });

  const { currentUser } = useContext(AuthContext);
  const { getMaterials, materials } = useAllMaterials();

  // 教材データの取得
  useEffect(() => {
    getMaterials();
  }, [getMaterials]);

  // まずはいいねされた教材を特定する（map?）(find?)
  // それを上のmaterialIdに入れる
  // mapなので配列になり、一つのmaterialIdに入れることはできないため、findで特定する必要がある
  // useSelectMaterials.tsを参考に、クリックした教材のidを特定する

  const materialIds = materials.map((material) => material.id);
  const materialId = materials.find((material) => material.id);
  // const materialId = materialIds.find((materialId) => material.id === id);

  // const likedMaterialId = likedMaterials.find(
  //   (likedMaterial) => likedMaterial.id
  // );
  // そもそもmaterialsの中身はどうなっている？　その中身を見て必要なものを　取り出すのはどう？
  // =>空配列になっている。useEffectのgetMaterialsを追加することで教材の情報を追加でき、配列が埋まる。
  console.log(materials);
  //   0
  // :
  // {id: 1, name: '教材1', description: 'これは教材1の説明文です。', userId: 1, createdAt: '2023-01-31T20:59:35.429Z', …}
  // 1
  // :
  // {id: 2, name: '教材2', description: 'これは教材2の説明文です。', userId: 1, createdAt: '2023-01-31T20:59:35.436Z', …}
  // 2
  // :
  // {id: 3, name: '教材3編集したよ', description: 'これは教材3の説明文です。', userId: 2, createdAt: '2023-01-31T20:59:35.444Z', …}
  // 3
  // :
  // {id: 4, name: '教材4', description: 'これは教材4の説明文です。', userId: 2, createdAt: '2023-01-31T20:59:35.450Z', …}
  // 4
  // :
  // {id: 5, name: '教材', description: '教材です', userId: 1, createdAt: '2023-02-01T11:28:32.357Z', …}
  // 5
  // :
  // {id: 6, name: 'a', description: '教材です', userId: 1, createdAt: '2023-02-04T04:24:49.309Z', …}
  // 6
  // :
  // {id: 7, name: 'kyouzai', description: 'kyouzaidesuこれは私が作った教材ですこれは教材教材', userId: 2, createdAt: '2023-02-13T21:02:23.503Z', …}
  // length
  // :
  // 7
  console.log(materialIds);
  //  [1, 2, 3, 4, 5, 6, 7]

  console.log(materialId);

  // console.log(likedMaterialId);

  // いいね追加時の挙動
  const handleGetLike = useCallback(async () => {
    setLikeData({
      userId: currentUser.id,

      // 配列だからidがないと言われている=undefinedになっている
      // 受け取ったidを元にいいねしたmaterialを検索
      materialId: 0,
      // ),
    });
    try {
      // いいねボタンを押したらいいねしているかを確認。
      const res = await likedCheck(materialId);
      setLikeCount(res.data.likeCount);
      if (res.data.like) {
        setLiked(true);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const clickToLike = useCallback(
    _.debounce(async () => {
      //現在のlikeの状態と逆の状態をchangeに代入
      //setLikedの更新。画面が更新される。changeを代入
      const change = true;
      setLiked(change);

      //いいねの数を＋1する
      try {
        const res = await createLike(materialId, likeData);
        setLikeCount(likeCount + 1);
      } catch (e) {
        console.log(e);
        console.log(materialId);
      }
    }, 500),
    []
  );

  //いいね解除時
  const clickToUnLike = useCallback(
    _.debounce(async () => {
      //現在のlikeの状態と逆の状態をchangeに代入
      //setLikesの更新。画面が更新される。changeを代入
      const change = false;
      setLiked(change);

      //いいねの数を-1にする
      try {
        // 配列だからidがないと言われているので1番目となる[0]を追加 だが取得できずundefined
        const res = await deleteLike(materialId);
        console.log(res.data);
        setLikeCount(likeCount - 1);
      } catch (e) {
        console.log(e);
        console.log(materialId);
      }
    }, 500),
    []
  );

  return {
    handleGetLike,
    clickToLike,
    clickToUnLike,
    liked,
    likeCount,
    initialLikeCount,
  };
};
