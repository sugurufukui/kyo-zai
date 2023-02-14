import { FC, memo, useContext } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { LikeButton } from "components/molecules/LikeButton";
import { User } from "types/api/user";
import { LikeContext } from "providers/LikeProvider";
import { Box } from "@mui/system";

type Props = {
  //教材のidの受け渡しができるように定義しておく
  id: number;
  imageUrl: string;
  materialName: string;
  // materialId: number | null;
  // currentUser: User;
  initialLikeCount: number;
  // コメントの数
  //クリック時に教材のデータ（id）を取得
  onClick: (id: number) => void;
};

export const MaterialCard: FC<Props> = memo((props) => {
  const {
    id,
    imageUrl,
    materialName,
    onClick,
    // materialId,
    // currentUser,
    initialLikeCount,
  } = props;

  // const { initialLikeCount } = useContext(LikeContext);
  return (
    <>
      <Box m={1}>
        <Card
          sx={{
            width: "260px",
            // height: "260px*1.5",
            bgcolor: "white",
            boxShadow: "md",
            p: "4",
            m: "2",
            borderRadius: "10px",
          }}
          // // カードをクリック時にどのカードをクリックしたのかをidで判別
          // onClick={() => onClick(id)}
        >
          <CardMedia
            sx={{
              p: 1,
              borderRadius: "30px",
              ":hover": { cursor: "pointer", opacity: "0.8" },
            }}
            component="img"
            height="260"
            alt={materialName}
            src={imageUrl}
            // 写真をクリックしたときにモーダル表示することにしてみる
            // カードをクリック時にどのカードをクリックしたのかをidで判別
            onClick={() => onClick(id)}
            // image="/static/images/cards/paella.jpg"
          />
          <CardContent sx={{ p: 1, textAlign: "center" }}>
            <Typography sx={{ variant: "h3" }}>{materialName}</Typography>
          </CardContent>
          <LikeButton
            // materialId={materialId}
            // currentUser={currentUser}
            initialLikeCount={initialLikeCount}
          />

          <CardActions sx={{ p: 1 }}>
            <IconButton aria-label="add to comment">
              <ChatBubbleOutlineIcon />
            </IconButton>
            <CardContent sx={{ p: 1 }}>
              <Typography sx={{ variant: "h5" }}>5</Typography>
            </CardContent>
          </CardActions>
        </Card>
      </Box>
    </>
  );
});
