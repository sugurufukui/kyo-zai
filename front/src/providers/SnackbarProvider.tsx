import { AlertColor } from "@mui/material";
import { AppSnackbar } from "components/molecules/AppSnackbar";
import {
  createContext,
  FC,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type SnackbarContextType = {
  message: string;
  severity: AlertColor;
  showSnackbar: (message: string, severity: AlertColor) => void;
};

type Props = {
  children: ReactNode;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  message: "",
  severity: "error",
  showSnackbar: (_message: string, _severity: AlertColor) => {},
});

export const SnackbarProvider: FC<Props> = memo((props) => {
  const { children } = props;
  const context: SnackbarContextType = useContext(SnackbarContext);
  const [message, setMessage] = useState(context.message);
  const [severity, setSeverity] = useState(context.severity);

  const newContext: SnackbarContextType = useMemo(
    () => ({
      message,
      severity,
      showSnackbar: (message: string, severity: AlertColor) => {
        setMessage(message);
        setSeverity(severity);
      },
    }),
    [message, severity, setMessage, setSeverity]
  );

  // クリックしたらSnackbarを閉じる
  const onClickClose = useCallback(() => {
    setMessage("");
  }, []);

  return (
    <SnackbarContext.Provider value={newContext}>
      {children}
      <AppSnackbar
        open={newContext.message !== ""}
        message={newContext.message}
        severity={newContext.severity}
        onClose={onClickClose}
      />
    </SnackbarContext.Provider>
  );
});

/** SnackbarContext を簡単に使うためのユーティリティ関数 */
export function useSnackbar(): SnackbarContextType {
  return useContext(SnackbarContext);
}
