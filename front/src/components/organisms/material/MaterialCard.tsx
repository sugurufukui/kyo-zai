import { FC, memo } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { LikeButton } from "components/molecules/LikeButton";
import { getDetailMaterial } from "lib/api/material";
import { createLike, deleteLike } from "lib/api/like";

type Props = {
  //教材のidの受け渡しができるように定義しておく
  id: number;
  imageUrl: string;
  materialName: string;
  // いいねの数
  // コメントの数
  //クリック時に教材のデータ（id）を取得
  onClick: (id: number) => void;
};

export const MaterialCard: FC<Props> = memo((props) => {
  const { id, imageUrl, materialName, onClick } = props;

  // //いいね追加時の挙動
  // const handleCreateLike = async (material) => {
  //   try {
  //     const res = await createLike(material.id);
  //     console.log(res.data);
  //     getDetailMaterial(); //教材データを取得
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // //いいね解除時の挙動

  // const handleDeleteLike = async (material) => {
  //   try {
  //     const res = await deleteLike(material.id);
  //     console.log(res.data);
  //     getDetailMaterial(); //教材データを取得
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <>
      <Card
        sx={{
          width: "260px",
          height: "260px",
          bgcolor: "white",
          boxShadow: "md",
          p: "4",
          m: "2",
          borderRadius: "10px",
          ":hover": { cursor: "pointer", opacity: "0.8" },
        }}
        // カードをクリック時にどのカードをクリックしたのかをidで判別
        onClick={() => onClick(id)}
      >
        <CardMedia
          sx={{ p: 1, borderRadius: "30px" }}
          component="img"
          height="160"
          alt={materialName}
          src={imageUrl}
          // image="/static/images/cards/paella.jpg"
        />
        <CardContent sx={{ p: 1, textAlign: "center" }}>
          <Typography sx={{ variant: "h3" }}>{materialName}</Typography>
        </CardContent>
        <CardActions sx={{ p: 1 }}>
          <IconButton aria-label="add to favorites">
            <FavoriteBorderIcon />
          </IconButton>
          <CardContent sx={{ p: 1 }}>
            <Typography sx={{ variant: "h5" }}>5</Typography>
          </CardContent>
          <IconButton aria-label="add to comment">
            <ChatBubbleOutlineIcon />
          </IconButton>
          <CardContent sx={{ p: 1 }}>
            <Typography sx={{ variant: "h5" }}>5</Typography>
          </CardContent>
          {/* {material.likes.find((like) => like.userId === currentUser.id)} ? (
          likesの配列の中にcurrentUser.idがあればlikeを解除、なければ作成
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
          ) */}
          {/* <LikeButton
            getDetailMaterial={getDetailMaterial}
            material={material}
            currentUser={currentUSer}
          /> */}
        </CardActions>
      </Card>
    </>
  );
});
