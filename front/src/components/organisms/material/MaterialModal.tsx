import { FC, memo } from "react";
import { useHistory } from "react-router-dom";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid, Modal } from "@mui/material";

import { MaterialType } from "types/api/materialType";
import { LikeButton } from "components/molecules/LikeButton";
import { User } from "types/api/user";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";

type Props = {
  material: MaterialType | null;
  open: boolean;
  onClose: () => void;
  materialId: number | null;
  currentUser: User;
  initialLikeCount: number;
  imageUrl: string;
};

// 一覧の中のいずれかをクリックすると表示されるモーダル画面
export const MaterialModal: FC<Props> = memo((props) => {
  const {
    material,
    open,
    onClose,
    materialId,
    currentUser,
    initialLikeCount,
    imageUrl,
  } = props;

  const history = useHistory();

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          justifyContent="center"
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: 4,
            p: 2,
          }}
        >
          <Grid
            alignItems="center"
            alignContent="center"
            justifyContent="center"
            direction="column"
          >
            <Card
              sx={{
                width: "260px",
                height: "260px",
                bgcolor: "white",
                boxShadow: "md",
                p: "4",
                m: "2",
                borderRadius: "10px",
                textAline: "center",
                alineItems: "center",
              }}
            >
              <CardMedia component="img" src={imageUrl}></CardMedia>
            </Card>
          </Grid>
          {/* materialはnullの可能性もあるので許容する為にオプショナルチェイニングを使用する */}
          <Box p={1}>
            <Typography>名前</Typography>

            <Typography>{material?.name}</Typography>
            <Typography>説明</Typography>

            <Typography>{material?.description}</Typography>
            <Button onClick={() => console.log(currentUser.id)}>
              今ログインしているユーザーID
            </Button>
            <Button onClick={() => console.log(material.userId)}>作成者</Button>
          </Box>
          <LikeButton
            materialId={materialId}
            currentUser={currentUser}
            initialLikeCount={initialLikeCount}
          />
          <Box sx={{ textAlign: "right" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                history.push(`/materials/${material?.id}`);
              }}
            >
              もっと詳しく
            </Button>
            {/* ログインユーザーと作成者が同じ場合に「編集ボタン」を表示 */}
            {currentUser.id === material.userId ? (
              <Button
                onClick={() => history.push(`/materials/edit/${material?.id}`)}
                startIcon={<BuildRoundedIcon />}
              >
                編集する
              </Button>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
});
