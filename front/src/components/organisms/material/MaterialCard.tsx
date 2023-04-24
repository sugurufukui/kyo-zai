import { FC, memo } from "react";

import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { LikeButton } from "components/molecules/LikeButton";
import { User } from "types/api/user";

type Props = {
  id: number;
  imageUrl: string;
  materialName: string;
  materialId: number | null;
  currentUser: User;
  initialLikeCount: number;
  onClick?: (id: number) => void;
};

// 一覧画面で表示する教材のカードコンポーネント
export const MaterialCard: FC<Props> = memo((props) => {
  const { id, imageUrl, materialName, onClick, materialId, currentUser, initialLikeCount } = props;

  return (
    <>
      <Box m={1}>
        <Card
          sx={{
            width: "260px",
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
            onClick={() => onClick(id)}
          />
          <CardContent sx={{ p: 1, height: 50 }}>
            <Typography
              sx={{
                variant: "h3",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              {materialName}
            </Typography>
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
