import { FC, memo, useState, useEffect, useContext, useCallback } from "react";

import { Link, useHistory, useParams } from "react-router-dom";

import { MaterialType } from "types/api/materialType";
import { deleteMaterial, getDetailMaterial } from "lib/api/material";
import { useSnackbar } from "providers/SnackbarProvider";

import { AuthContext } from "providers/AuthProvider";
import { LikeButton } from "components/molecules/LikeButton";
import ReplyIcon from "@mui/icons-material/Reply";

import { likedCheck } from "lib/api/like";
// import { useLike } from "hooks/useLike";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
// import { DeleteDialog } from "components/molecules/DeleteDialog";
type Props = {
  initialLikeCount: number;
};

export const Detail: FC<Props> = memo((props) => {
  const { initialLikeCount } = props;
  const history = useHistory();

  // { id = 1 } を取得する
  const query: any = useParams();

  const [value, setValue] = useState({
    id: 0,
    name: "",
    description: "",
    userId: 0,
  });

  const { currentUser } = useContext(AuthContext);
  const { showSnackbar } = useSnackbar();

  // 教材詳細API(materials_controllerのshowの中のjsonの内容を引用)
  const getDetail = async (query: any) => {
    try {
      const res = await getDetailMaterial(query.id);
      console.log(res.data);
      setValue({
        id: res.data.id,
        name: res.data.name,
        description: res.data.description,
        userId: res.data.userId,
      });
    } catch (e) {
      console.log(e);
    }
  };

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
  const [open, setOpen] = useState(true);
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
              削除すると2度と復元することができません。本当に削除してもよろしいですか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose} autoFocus>
              戻る
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
    try {
      const res = await likedCheck(query.id);
      console.log(res.data);
      setLikeCount(res.data.likeCount);
    } catch (e) {
      console.log(e);
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
      <Grid container justifyContent="center" textAlign="center">
        <Grid item xs={8}>
          教材の情報
          <p>教材詳細ページです</p>
          <div>教材のID:{value?.id}</div>
          <div>名前:{value?.name}</div>
          <div>説明:{value?.description}</div>
          <div>作成者ID:{value?.userId}</div>
          <LikeButton
            materialId={query.id}
            currentUser={currentUser}
            initialLikeCount={likeCount}
          />
        </Grid>
        <Grid item xs={4}>
          作成したユーザーの情報
          <Button
            // color=""
            startIcon={<ReplyIcon />}
            onClick={() => history.goBack()}
          >
            戻る
          </Button>
          {currentUser.id === value?.userId ? (
            <Button
              onClick={() => history.push(`/materials/edit/${value?.id}`)}
              startIcon={<BuildRoundedIcon />}
            >
              編集する
            </Button>
          ) : (
            <></>
          )}
          {currentUser.id === value.userId ? (
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => deleteDialogOpen()}
              color="error"
            >
              削除する
            </Button>
          ) : (
            <></>
          )}
          {/*  削除確認用ダイアログ */}
          <DeleteDialog />
        </Grid>
      </Grid>
    </>
  );
});
