import { CardMedia, Skeleton } from "@mui/material";
import React, { FC, memo, useEffect, useState } from "react";

type Props = {
  file: File | null;
  height: number;
};

export const ImagePreview: FC<Props> = memo((props) => {
  const { file, height } = props;

  const [url, setUrl] = useState<string>("");
  const isLoading = file && !url;

  useEffect(() => {
    if (!file) {
      return;
    }

    let reader: FileReader | null = new FileReader();
    reader.onloadend = () => {
      // TypeError: Cannot read properties of null (reading 'result')のため、!から?に変更
      const res = reader?.result;
      if (res && typeof res === "string") {
        setUrl(res);
      }
    };
    reader.readAsDataURL(file);

    return () => {
      reader = null;
    };
  }, [file]);

  return file ? (
    isLoading ? (
      <Skeleton />
    ) : (
      <CardMedia component="img" height={height} alt={file.name} src={url} />
    )
  ) : null;
});
