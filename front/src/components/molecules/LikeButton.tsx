import { FC, memo, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { createLike, deleteLike, likedCheck } from "lib/api/like";

import { Typography } from "@mui/material";
import { User } from "types/api/user";

import _ from "lodash";

type Props = {
  materialId: number | null;
  currentUser: User;
  initialLikeCount: number;
};

// いいねのボタンといいね数を表示するだけのもの
export const LikeButton: FC<Props> = memo((props) => {
  const { materialId, currentUser, initialLikeCount } = props;

  //いいねの🤍の色を管理
  const [liked, setLiked] = useState(false);

  //いいねの数を管理
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  // 誰がどの教材にいいねしたのか
  const [likeData, setLikeData] = useState({
    userId: 0,
    materialId: 0,
  });

  // いいね追加時の挙動
  const handleGetLike = async () => {
    setLikeData({
      userId: currentUser.id,
      materialId: materialId,
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
  };

  const clickToLike = _.debounce(async () => {
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
    }
  }, 500);

  //いいね解除時
  const clickToUnLike = _.debounce(async () => {
    //現在のlikeの状態と逆の状態をchangeに代入
    //setLikesの更新。画面が更新される。changeを代入
    const change = false;
    setLiked(change);

    //いいねの数を-1にする
    try {
      const res = await deleteLike(materialId);
      console.log(res.data);
      setLikeCount(likeCount - 1);
    } catch (e) {
      console.log(e);
    }
  }, 500);

  useEffect(() => {
    handleGetLike();
  }, [currentUser]);

  return (
    // likedがfalseであれば作成(true)にする（clickToLike）
    <>
      {liked === false && (
        <IconButton onClick={() => clickToLike()} aria-label="いいねを追加する">
          <FavoriteBorderIcon />
        </IconButton>
      )}
      {liked === true && (
        <IconButton
          onClick={() => clickToUnLike()}
          aria-label="いいねを解除する"
        >
          <FavoriteIcon />
        </IconButton>
      )}
      <Typography>いいね{likeCount}</Typography>
    </>
  );
});
