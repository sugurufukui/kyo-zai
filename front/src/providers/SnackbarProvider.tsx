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

import { AlertColor } from "@mui/material";

import { AppSnackbar } from "components/molecules/common/AppSnackbar";

type SnackbarContextType = {
  message: string;
  severity: AlertColor;
  showSnackbar: (message: string, severity: AlertColor) => void;
  resetSnackbar: () => void;
};

type Props = {
  children: ReactNode;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  message: "",
  severity: "error",
  showSnackbar: (_message: string, _severity: AlertColor) => {},
  resetSnackbar: () => {},
});

export const SnackbarProvider: FC<Props> = memo((props) => {
  const { children } = props;
  const context: SnackbarContextType = useContext(SnackbarContext);
  const [message, setMessage] = useState(context.message);
  const [severity, setSeverity] = useState(context.severity);
  const resetSnackbar = useCallback(() => {
    setMessage("");
  }, []);

  const newContext: SnackbarContextType = useMemo(
    () => ({
      message,
      severity,
      showSnackbar: (message: string, severity: AlertColor) => {
        setMessage(message);
        setSeverity(severity);
      },
      resetSnackbar,
    }),
    [message, severity, setMessage, setSeverity, resetSnackbar]
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
