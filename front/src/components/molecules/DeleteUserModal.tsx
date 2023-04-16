import { FC, memo, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { User } from "types/api/user";
import { deleteUser, sendDeletionConfirmationEmail } from "lib/api/user";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "providers/SnackbarProvider";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  open: boolean;
  handleClose: () => void;
  user: User;
};

export const DeleteUserModal: FC<Props> = memo((props) => {
  const { open, handleClose, user } = props;
  const history = useHistory();
  const { showSnackbar } = useSnackbar();

  // ユーザー削除
  const onClickDelete = useCallback(async () => {
    try {
      // ユーザー削除前にメール送信処理
      await sendDeletionConfirmationEmail(user.id);
      //ユーザー削除
      await deleteUser(user.id);
    } finally {
      showSnackbar("「きょーざい」から退会しました。", "success");
      history.push("/");
    }
  }, [history, showSnackbar, user]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          退会するとこれまでのデータを復元することができません。
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          本当に退会してもよろしいですか？
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
          onClick={onClickDelete}
        >
          退会する
        </Button>
      </DialogActions>
    </Dialog>
  );
});
