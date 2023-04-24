import { FC, memo } from "react";

import { Button } from "@mui/material";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";

import { useSnackbar } from "providers/SnackbarProvider";

export const CanNotUserEditToastButton: FC = memo(() => {
  const { showSnackbar } = useSnackbar();

  return (
    <Button
      fullWidth
      variant="outlined"
      color="primary"
      style={{ marginTop: "1rem" }}
      startIcon={<BuildRoundedIcon />}
      onClick={() => showSnackbar("ゲストユーザーのため、アカウントの編集ができません", "error")}
    >
      アカウントを編集する
    </Button>
  );
});
