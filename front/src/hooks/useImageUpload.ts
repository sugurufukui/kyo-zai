import { useState, useCallback } from "react";

import { resizeImage } from "lib/imageResizeUtil";
import { useSnackbar } from "providers/SnackbarProvider";

// 教材の画像投稿時に関するカスタムフック
export const useImageUpload = () => {
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null | undefined>(undefined);
  const { showSnackbar } = useSnackbar();

  // 画像追加&プレビュー
  const uploadImage = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file.type.includes("image/")) {
      setImage(null);
      showSnackbar("そのファイルは登録できません", "error");
      return;
    }
    try {
      const resizedImage = await resizeImage(file, 1024, 1024);
      setImage(resizedImage);
      setPreview(window.URL.createObjectURL(resizedImage));
    } catch (error) {
      showSnackbar("画像のリサイズに失敗しました。", "error");
    }
  }, []);

  // プレビュー画像取り消し
  const resetFile = useCallback(() => {
    setImage(null);
    setPreview(null);
  }, []);

  return {
    image,
    preview,
    uploadImage,
    resetFile,
  };
};
