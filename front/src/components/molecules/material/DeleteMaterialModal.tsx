import { FC, memo, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteMaterial } from "lib/api/material";
import { useSnackbar } from "providers/SnackbarProvider";
import { MaterialType } from "types/api/materialType";

type Props = {
  open: boolean;
  handleClose: () => void;
  item: MaterialType;
};

export const DeleteMaterialModal: FC<Props> = memo((props) => {
  const { open, handleClose, item } = props;
  const history = useHistory();
  const { showSnackbar } = useSnackbar();

  //教材を削除する
  const onClickDelete = useCallback(async () => {
    try {
      await deleteMaterial(item.id);
      history.push("/mine_materials");
      showSnackbar("教材を削除しました", "success");
    } catch (e) {
      console.log(e);
      showSnackbar("教材の削除に失敗しました。", "error");
    } finally {
    }
  }, [history, showSnackbar, item]);

  return (
    <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-description">
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
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={onClickDelete}>
          削除する
        </Button>
      </DialogActions>
    </Dialog>
  );
});
