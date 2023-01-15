import { FC, memo } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

type Props = {
  onClick: (id: number) => void;
};

export const MaterialCard: FC<Props> = memo((props) => {
  const { onClick } = props;

  return (
    <>
      <Card
        sx={{
          width: "260px",
          height: "260px",
          bgcolor: "white",
          boxShadow: "md",
          p: "4",
          ":hover": { cursor: "pointer", opacity: "0.8" },
        }}
        // onClick={() => onClick(id)}
      >
        <CardMedia
          sx={{ p: 1, borderRadius: "30px" }}
          component="img"
          height="160"
          alt="materialImage"
          src="https://source.unsplash.com/random"
          // image="/static/images/cards/paella.jpg"
        />
        <CardContent sx={{ p: 1, textAlign: "center" }}>
          <Typography sx={{ variant: "h3" }}>教材の名前</Typography>
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
        </CardActions>
      </Card>
    </>
  );
});
