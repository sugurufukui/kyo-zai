import { FC, memo, useCallback, useEffect, useState } from "react";

import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { createLike, deleteLike, likedCheck } from "lib/api/like";
import { User } from "types/api/user";
import _ from "lodash";

type Props = {
  materialId: number | null;
  currentUser: User;
  initialLikeCount: number;
};

// いいねのボタンといいね数を表示するだけのコンポーネント
export const LikeButton: FC<Props> = memo((props) => {
  const { materialId, currentUser, initialLikeCount } = props;

  //いいねの有無を管理
  const [liked, setLiked] = useState(false);

  //いいねの数を管理
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  // 誰がどの教材にいいねしたのか
  const [likeData, setLikeData] = useState({
    userId: 0,
    materialId: 0,
  });

  // ログインユーザーのいいね情報を確認
  const handleGetLike = useCallback(async () => {
    setLikeData({
      userId: currentUser?.id,
      materialId: materialId,
    });
    try {
      const res = await likedCheck(materialId);
      setLikeCount(res.data.likeCount);
      if (res.data.like) {
        setLiked(true);
      }
    } catch (e) {
      console.log(e);
    }
  }, [currentUser?.id, materialId]);

  //likedの状態に応じて、いいねの仕様変更
  const toggleLike = _.debounce(async () => {
    setLiked(!liked);
    try {
      if (liked) {
        const res = await deleteLike(materialId);
        setLikeCount(likeCount - 1);
        console.log(res.data.status, likeCount - 1);
      } else {
        const res = await createLike(materialId, likeData);
        setLikeCount(likeCount + 1);
        console.log(res.data.status, likeCount + 1);
      }
    } catch (e) {
      console.log(e);
    }
  }, 500);

  useEffect(() => {
    handleGetLike();
  }, [handleGetLike]);

  return (
    <IconButton
      onClick={() => toggleLike()}
      aria-label={liked ? "いいねを解除する" : "いいねを追加する"}
    >
      {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}

      <Typography>{likeCount}</Typography>
    </IconButton>
  );
});
