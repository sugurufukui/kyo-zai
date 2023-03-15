import { FC, memo } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { LikeButton } from "components/molecules/LikeButton";
import { User } from "types/api/user";
import { Box } from "@mui/system";

type Props = {
  //教材のidの受け渡しができるように定義しておく
  id: number;
  imageUrl: string;
  materialName: string;
  materialId: number | null;
  currentUser: User;
  initialLikeCount: number;
  //クリック時に教材のデータ（id）を取得
  onClick: (id: number) => void;
};

export const MaterialCard: FC<Props> = memo((props) => {
  const {
    id,
    imageUrl,
    materialName,
    onClick,
    materialId,
    currentUser,
    initialLikeCount,
  } = props;

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
        >
          <CardMedia
            sx={{
              p: 1,
              borderRadius: "30px",
              ":hover": { cursor: "pointer", opacity: "0.8" },
            }}
            component="img"
            src={imageUrl}
            width="(260 * 4) / 3"
            height="260"
            alt={materialName}
            // カードをクリック時にどのカードをクリックしたのかをidで判別
            onClick={() => onClick(id)}
          />
          <CardContent sx={{ p: 1, textAlign: "center" }}>
            <Typography sx={{ variant: "h3" }}>{materialName}</Typography>
          </CardContent>
          <Box sx={{ textAlign: "right" }}>
            <LikeButton
              materialId={materialId}
              currentUser={currentUser}
              initialLikeCount={initialLikeCount}
            />
          </Box>
        </Card>
      </Box>
    </>
  );
});
