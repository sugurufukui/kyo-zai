import React, { FC } from "react";

import { Box, Typography } from "@mui/material";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";

type Props = {
  image: string | null;
};

// 編集時に変更前の写真を表示するコンポーネント
export const ExistingImage: FC<Props> = (props) => {
  const { image } = props;

  return (
    <Box sx={{ mt: 1 }}>
      <Typography fontWeight="bold" color="gray" variant="subtitle2">
        現在使用している写真
      </Typography>
      <Box textAlign="center" sx={{ pt: 2 }}>
        <img
          src={image}
          alt="変更前の写真"
          style={{
            maxWidth: "100%",
            maxHeight: 260,
            objectFit: "contain",
          }}
        />
      </Box>
      <Box sx={{ m: 4, height: 0, textAlign: "center" }}>
        <KeyboardDoubleArrowDownRoundedIcon fontSize="large" />
      </Box>
    </Box>
  );
};
