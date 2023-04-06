import { FC, memo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { MaterialType } from "types/api/materialType";
import { deleteMaterial } from "lib/api/material";
import { useHistory, useParams } from "react-router-dom";
import { useSnackbar } from "providers/SnackbarProvider";

type Props = {
  onClose: () => void;
  onClickDelete: () => void;
  onClick: () => void;
};

export const DeleteDialog: FC<Props> = memo((props) => {
  const { onClose, onClick } = props;
  const history = useHistory();
  const query: any = useParams();

  const { showSnackbar } = useSnackbar();

  //削除確認用ダイアログ用
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const deleteDialogOpen = () => {
    setOpen(true);
  };

  //削除する
  const onClickDelete = async (item: MaterialType) => {
    // ローディングスタート
    console.log("click", item.id);
    try {
      const res = await deleteMaterial(item.id);
      // 削除後に一覧ページに遷移する
      history.push("/materials");
      // 削除の前に確認ボタンが欲しい「削除してもいいですか？」
      // muiのDialogのアラートを参照する

      showSnackbar("削除しました", "success");
    } catch (e) {
      console.log(e);
      showSnackbar("削除に失敗しました。", "error");
    } finally {
      // ローディング停止
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            削除すると2度と復元することができません。本当に削除してもよろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={onClickDelete}>削除する</Button> */}
          <Button onClick={onClick} autoFocus>
            戻る
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
