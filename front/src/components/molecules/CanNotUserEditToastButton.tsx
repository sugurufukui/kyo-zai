import { Button } from "@mui/material";
import { useSnackbar } from "providers/SnackbarProvider";
import { FC, memo } from "react";

export const CanNotUserEditToastButton: FC = memo(() => {
  const { showSnackbar } = useSnackbar();

  return (
    <Button
      fullWidth
      variant="outlined"
      color="primary"
      style={{ marginTop: "1rem" }}
      // startIcon={<EditIcon />}

      onClick={() =>
        showSnackbar("ゲストユーザーのため、編集ができません", "error")
      }
    >
      編集
    </Button>
  );
});
