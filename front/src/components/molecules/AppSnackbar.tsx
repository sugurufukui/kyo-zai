import { AlertColor, AlertProps, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { FC, forwardRef } from "react";

/** スナックバーの表示をカスタマイズ */
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  open: boolean;
  message: string;
  severity?: AlertColor;
  onClose?: () => void;
};

export const AppSnackbar: FC<Props> = (props) => {
  const { open = false, message, severity = "info", onClose } = props;
  return (
    <Snackbar
      //open,onCloseはpropsで受け渡して変更可能。autoHideDuration,anchorOriginは固定値。
      open={open}
      onClose={onClose}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};
