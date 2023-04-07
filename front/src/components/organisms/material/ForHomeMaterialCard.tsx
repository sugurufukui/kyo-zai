import { FC, memo } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { User } from "types/api/user";
import { Box } from "@mui/system";

type Props = {
  id: number;
  imageUrl: string;
  materialName: string;
  materialId: number | null;
  currentUser: User;
  initialLikeCount?: number;
  onClick?: (id: number) => void;
};

export const ForHomeMaterialCard: FC<Props> = memo((props) => {
  const { id, imageUrl, materialName, onClick } = props;

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
            }}
            component="img"
            src={imageUrl}
            width="(260 * 4) / 3"
            height="260"
            alt={materialName}
            onClick={() => onClick(id)}
          />
          <CardContent sx={{ p: 1, height: 50 }}>
            <Typography sx={{ variant: "h3" }}>{materialName}</Typography>
          </CardContent>
          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ variant: "h3" }}>
              <FavoriteBorderIcon />
            </Typography>
          </Box>
        </Card>
      </Box>
    </>
  );
});
