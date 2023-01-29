import { FC, memo } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { createLike, deleteLike } from "lib/api/like";
import { User } from "types/api/user";

type Props = {
  getDetailMaterial: any;
  material: any;
  currentUser: User;
};

export const LikeButton: FC<Props> = memo((props) => {
  const { getDetailMaterial, material, currentUser } = props;

  //いいね追加時の挙動
  const handleCreateLike = async (material) => {
    try {
      const res = await createLike(material.id);
      console.log(res.data);
      getDetailMaterial(); //教材データを取得
    } catch (e) {
      console.log(e);
    }
  };

  //いいね解除時の挙動
  const handleDeleteLike = async (material) => {
    try {
      const res = await deleteLike(material.id);
      console.log(res.data);
      getDetailMaterial(); //教材データを取得
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {material.likes.find((like) => like.userId === currentUser.id)} ? (
      {/* likesの配列の中にcurrentUser.idがあればlikeを解除、なければ作成 */}
      <IconButton
        onClick={() => handleDeleteLike(material)}
        aria-label="add to favorites"
      >
        <FavoriteBorderIcon />
        {material.likes.length}
      </IconButton>
      ) :(
      <IconButton
        onClick={() => handleCreateLike(material)}
        aria-label="add to favorites"
      >
        <FavoriteBorderIcon />
        {material.likes.length}
      </IconButton>
      )
    </>
  );
});
