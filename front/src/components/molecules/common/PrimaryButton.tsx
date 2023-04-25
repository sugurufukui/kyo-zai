import { FC, memo, ReactNode } from "react";

import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

type Props = {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  loading: boolean;
  fullWidth?: boolean;
};

export const PrimaryButton: FC<Props> = memo((props) => {
  const { children, onClick, disabled = false, loading = false, fullWidth } = props;

  return (
    <>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={onClick}
        disabled={disabled || loading}
        fullWidth={fullWidth}
        sx={{
          boxShadow: 0,
          fontWeight: "bold",
          ":hover": { boxShadow: 0, bgcolor: "primary.light" },
          position: "relative",
        }}
      >
        {children}
        {loading && (
          <LinearProgress
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "4px",
            }}
          />
        )}
      </Button>
    </>
  );
});
