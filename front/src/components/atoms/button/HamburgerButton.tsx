import { FC, memo } from "react";

import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  onOpen: () => void;
};

export const HamburgerButton: FC<Props> = memo((props) => {
  const { onOpen } = props;
  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="small"
        aria-label="メニューボタン"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={onOpen}
        style={{ color: "white" }}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
});
