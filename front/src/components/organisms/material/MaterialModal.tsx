import { FC, memo } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Box, Button, IconButton, Modal, TextField } from "@mui/material";

import { MaterialType } from "types/api/materialType";
import { LikeButton } from "components/molecules/LikeButton";
import { User } from "types/api/user";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import ImageSearchTwoToneIcon from "@mui/icons-material/ImageSearchTwoTone";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { grey } from "@mui/material/colors";

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
      <Modal open={open} onClose={onClose} sx={{ overflowY: "auto" }}>
        <Box
          justifyContent="center"
          sx={{
            width: 380,
            height: "auto",
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            // border: "2px solid #000",
            borderRadius: 4,
            p: 2,
            my: 3,
          }}
        >
          <Box sx={{ height: 0, textAlign: "right" }}>
            <IconButton onClick={onClose}>
              <HighlightOffIcon fontSize="large" sx={{ color: grey[800] }} />
            </IconButton>
          </Box>
          <Box alignItems="center" textAlign="center" sx={{ pt: 2 }}>
            <img
              src={imageUrl}
              alt={material?.name}
              width={(260 * 4) / 3}
              // height={260}
            />
          </Box>
          <Box p={1}>
            <TextField
              variant="outlined"
              fullWidth
              label="名前"
              value={material?.name}
              margin="dense"
              InputProps={{
                readOnly: true,
              }}
              multiline
            />
            <TextField
              variant="outlined"
              fullWidth
              label="説明"
              value={material?.description}
              margin="dense"
              InputProps={{
                readOnly: true,
              }}
              id="outlined-multiline-flexible"
              multiline
              maxRows={5}
            />
          </Box>
          <Box sx={{ pl: 1 }}>
            <Typography
              fontWeight="bold"
              color="gray"
              fontSize="0.75rem"
              sx={{ mb: 1 }}
            >
              いいねの数
            </Typography>
            <LikeButton
              materialId={materialId}
              currentUser={currentUser}
              initialLikeCount={initialLikeCount}
            />
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => {
                history.push(`/materials/${material?.id}`);
              }}
              startIcon={<ImageSearchTwoToneIcon />}
            >
              もっと詳しく
            </Button>

            {/* ログインユーザーと作成者が同じ場合に「編集ボタン」を表示 */}
            {currentUser.id === material?.userId ? (
              <Box sx={{ mt: 1 }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() =>
                    history.push(`/materials/edit/${material?.id}`)
                  }
                  startIcon={<BuildRoundedIcon />}
                >
                  　編集する　
                </Button>
              </Box>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
});
