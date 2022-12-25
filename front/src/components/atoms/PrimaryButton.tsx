import { FC, memo, ReactNode, useState } from "react";
import Button from "@mui/material/Button";
import { FormControlLabel, Switch } from "@mui/material";

type Props = {
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
};

export const PrimaryButton: FC<Props> = memo((props) => {
  const { children, onClick, disabled = false, fullWidth } = props;

  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={onClick}
        disabled={disabled}
        // disabled={disabled || loading}
        // isLoading={loading}
        fullWidth={fullWidth}
        // sx={{
        //   "$:hover": { opacity: 0.8 },
        // }}
      >
        {children}
      </Button>
    </>
  );
});
