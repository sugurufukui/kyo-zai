// import { FC, memo, useContext, useEffect, useState } from "react";
// import IconButton from "@mui/material/IconButton";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import { createLike, deleteLike } from "lib/api/like";
// import { useAllMaterials } from "hooks/useAllMaterials";
// import { AuthContext } from "providers/AuthProvider";
// import { Typography } from "@mui/material";
// import { User } from "types/api/user";
// import { MaterialType } from "types/api/materialType";

// type Props = {
//   //MaterialListに従って複数形のmaterialsに
//   materialId: number | null;
//   currentUser: User;
//   initialLikeCount: number;
// };

// // いいねのボタンといいね数を表示するだけのもの
// export const LikeButton: FC<Props> = memo((props) => {
//   const { materialId, currentUser, initialLikeCount } = props;
//   //materialのデータをカスタムフックから取得するか、context化してそこから持ってくるか
//   // 他のコンポーネントではmaterialの情報をどのように受渡しているのか確認する
//   // 一覧画面に表示させるためには一度materialCardを通すため、propsの受け渡しが煩雑になってしまう可能性がある、

//   //いいねの🤍の色を管理
//   const [liked, setLiked] = useState(false);

//   //いいねの数を管理
//   const [likeCount, setLikeCount] = useState(initialLikeCount);
//   // 誰がどの教材にいいねしたのか
//   const [likeData, setLikeData] = useState({
//     userId: null,
//     materialId: null,
//   });

//いいね追加時の挙動
//いいねボタンを押したらいいねしているかを確認。
// const handleGetLike = async () => {
//   setLikeData({
//     userId: String(currentUser.id),
//     // Cannot read properties of undefined (reading 'id')
//     materialId: materialId,
//   });
//   try {
//     const res = await likedCheck(materialId);

//     setLikeCount(res.data.likeCount);

//     //likeデータがあればtrueにして色を変える
//     if (res.data.like) {
//       setLiked(true);
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };

// const clickToLike = async () => {
//   //現在のlikeの状態と逆の状態をchangeに代入
//   //setLikesの更新。画面が更新される。changeを代入
//   // change必要か？
//   // そのままtrue,falseでよくないか？
//   const change = true;
//   setLiked(change);

//   //いいねの数を＋1する
//   try {
//     const res = await createLike(materialId, likeData);
//     setLikeCount(likeCount + 1);
//   } catch (e) {
//     console.log(e);
//   }
// };

// //いいね解除時の挙動
// const clickToUnLike = async () => {
//   //現在のlikeの状態と逆の状態をchangeに代入
//   //setLikesの更新。画面が更新される。changeを代入
//   const change = false;
//   setLiked(change);

//   //いいねの数を-1にする
//   try {
//     const res = await deleteLike(materialId);
//     console.log(res.data);
//     setLikeCount(likeCount - 1);
//   } catch (e) {
//     console.log(e);
//   }
// };

// useEffect(() => {
//   handleGetLike();
// }, [currentUser]);

//   return (
//     // likedがfalseであれば作成(true)にする（clickToLike）
//     <>
//       {/* {liked === false && (
//         <IconButton onClick={() => clickToLike()} aria-label="いいねを追加する">
//           <FavoriteBorderIcon />
//         </IconButton>
//       )} */}
//       {liked === true && (
//         <IconButton
//           onClick={() => clickToUnLike()}
//           aria-label="いいねを解除する"
//         >
//           <FavoriteIcon />
//         </IconButton>
//       )}
//       <Typography>いいね{likeCount}</Typography>
//     </>
//   );
// });

import { FC, memo } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { createLike, deleteLike } from "lib/api/like";
import { User } from "types/api/user";
import { getAllMaterial, getDetailMaterial } from "lib/api/material";

type Props = {
  // getDetailMaterial: any;
  material: any;
  currentUser: User;
};

export const LikeButton: FC<Props> = memo((props) => {
  const { material, currentUser } = props;

  //いいね追加時の挙動
  const handleCreateLike = async (item) => {
    try {
      const res = await createLike(item.id);
      console.log(res.data);
      // getDetailMaterial(); //教材データを取得
      getAllMaterial(); //教材一覧を取得
    } catch (e) {
      console.log(e);
    }
  };

  //いいね解除時の挙動
  const handleDeleteLike = async (material) => {
    try {
      const res = await deleteLike(material.id);
      console.log(res.data);
      // getDetailMaterial(); //教材データを取得]
      getAllMaterial(); //教材一覧を取得
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
//
