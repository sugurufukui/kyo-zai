import { FC, memo, useState, useEffect, useContext, useCallback } from "react";

import { useHistory, useParams } from "react-router-dom";

import { MaterialType } from "types/api/materialType";
import { deleteMaterial, getDetailMaterial } from "lib/api/material";
import { useSnackbar } from "providers/SnackbarProvider";

import { AuthContext } from "providers/AuthProvider";
import { LikeButton } from "components/molecules/LikeButton";
import ReplyIcon from "@mui/icons-material/Reply";

import { likedCheck } from "lib/api/like";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import { Box } from "@mui/system";
import moment from "moment";

type Props = {
  initialLikeCount: number;
};

export const Detail: FC<Props> = memo((props) => {
  const { initialLikeCount } = props;
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  // { id = 1 } を取得する
  const query: any = useParams();

  const [value, setValue] = useState({
    id: null,
    name: "",
    description: "",
    userId: 0,
    userName: "",
    image: undefined,
    createdAt: "",
  });

  const { currentUser } = useContext(AuthContext);
  const { showSnackbar } = useSnackbar();

  // 教材詳細API(materials_controllerのshowの中のjsonの内容を引用)
  const getDetail = useCallback(async (query: any) => {
    try {
      const res = await getDetailMaterial(query.id);
      console.log(res.data);
      setValue({
        id: res.data.id,
        name: res.data.name,
        description: res.data.description,
        userId: res.data.userId,
        userName: res.data.user.name,
        image: res.data.image.url,
        createdAt: res.data.createdAt,
      });
    } catch (e) {
      console.log(e);
      showSnackbar("その教材は存在しません", "error");
      history.push("/notfound404");
    }
  }, []);

  //削除する
  const onClickDelete = useCallback(
    async (item: MaterialType) => {
      // ローディングスタート
      console.log("click", item.id);
      try {
        const res = await deleteMaterial(item.id);
        // 削除後に一覧ページに遷移する
        history.push("/materials");
        showSnackbar("削除しました", "success");
      } catch (e) {
        console.log(e);
        showSnackbar("削除に失敗しました。", "error");
      } finally {
        // ローディング停止
      }
    },
    [history, showSnackbar]
  );

  //削除確認用ダイアログ用
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const deleteDialogOpen = () => {
    setOpen(true);
  };
  const DeleteDialog = useCallback(() => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              削除すると2度と復元することができません。
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              本当に削除してもよろしいですか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose} autoFocus>
              やめる
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => onClickDelete(query)}
            >
              削除する
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }, [onClickDelete, open, query]);

  //いいねの数を管理
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  //いいね確認API
  const handleGetLike = useCallback(async () => {
    setLoading(true);
    try {
      const res = await likedCheck(query.id);
      console.log(res.data);
      setLikeCount(res.data.likeCount);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  // 画面描画時にidがundefinedだとデータ取得ができないので、
  // 依存配列にidを入れてidがundefined => 1 と更新された時に
  // useEffectの副作用を使って処理をもう一度実行させる
  useEffect(() => {
    getDetail(query);
    handleGetLike();
    DeleteDialog();
  }, [query, DeleteDialog, handleGetLike]);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {value?.name}
                  </Typography>
                </CardContent>
                <CardContent sx={{ textAlign: "center" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: "90%", display: "inline" }}
                    image={value?.image}
                    title={value?.name}
                  />
                </CardContent>
                <CardContent sx={{ pl: { xs: 3, md: 5 } }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    教材の説明
                  </Typography>
                  <Typography variant="body1">{value?.description}</Typography>
                </CardContent>
                <CardContent sx={{ pl: { xs: 3, md: 5 } }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    いいねの数
                  </Typography>
                  {value?.id !== null && (
                    <LikeButton
                      materialId={value?.id}
                      currentUser={currentUser}
                      initialLikeCount={initialLikeCount}
                    />
                  )}
                </CardContent>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    投稿日：{moment(value?.createdAt).format("YYYY-MM-DD")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="text.secondary">
                    つくったひと
                  </Typography>
                </CardContent>
                <CardContent>
                  <Avatar />
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {value?.userName}
                  </Typography>
                </CardContent>
                <CardContent sx={{ textAlign: "center" }}>
                  <Stack spacing={2}>
                    {currentUser?.id === value?.userId ? (
                      <>
                        <Button
                          variant="outlined"
                          onClick={() =>
                            history.push(`/materials/edit/${value?.id}`)
                          }
                          startIcon={<BuildRoundedIcon />}
                          sx={{ p: "3" }}
                        >
                          教材を編集する
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => deleteDialogOpen()}
                          color="error"
                        >
                          教材を削除する
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                  </Stack>
                </CardContent>
                <DeleteDialog />
              </Card>
              <Button
                variant="contained"
                startIcon={<ReplyIcon />}
                onClick={() => history.push("/materials")}
              >
                教材一覧ページへ
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
});
