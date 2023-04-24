import { FC, memo, useState, useEffect, useContext, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";

import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import { DeleteMaterialModal } from "components/molecules/DeleteMaterialModal";
import { LikeButton } from "components/molecules/LikeButton";
import { likedCheck } from "lib/api/like";
import { getDetailMaterial } from "lib/api/material";
import { AuthContext } from "providers/AuthProvider";
import { useSnackbar } from "providers/SnackbarProvider";
import moment from "moment";

type Props = {
  initialLikeCount: number;
};

// 教材詳細ページ
export const Detail: FC<Props> = memo((props) => {
  const { initialLikeCount } = props;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { showSnackbar } = useSnackbar();

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

  //削除確認用ダイアログ用
  const [open, setOpen] = useState(false);
  const deleteDialogClose = () => {
    setOpen(false);
  };
  const deleteDialogOpen = () => {
    setOpen(true);
  };

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
  }, [getDetail, query, handleGetLike]);

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
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                    教材の説明
                  </Typography>
                  <Typography variant="body1">{value?.description}</Typography>
                </CardContent>
                <CardContent sx={{ pl: { xs: 3, md: 5 } }}>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
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
                  <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
                    {value?.userName}
                  </Typography>
                </CardContent>
                <CardContent sx={{ textAlign: "center" }}>
                  <Stack spacing={2}>
                    {currentUser?.id === value?.userId ? (
                      <>
                        <Button
                          variant="outlined"
                          onClick={() => history.push(`/materials/edit/${value?.id}`)}
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
                        <DeleteMaterialModal
                          open={open}
                          handleClose={deleteDialogClose}
                          item={query}
                        />
                      </>
                    ) : null}
                  </Stack>
                </CardContent>
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
