// imageResizeUtil.ts
export const resizeImage = async (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const aspectRatio = img.width / img.height;

      let width = maxWidth;
      let height = maxHeight;

      if (img.width > img.height) {
        height = maxWidth / aspectRatio;
      } else {
        width = maxHeight * aspectRatio;
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject("リサイズ処理で問題が発生しました。");
          } else {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
            });
            resolve(resizedFile);
          }
        },
        file.type,
        0.9
      );
    };

    img.onerror = () => {
      reject("画像の読み込みに失敗しました。");
    };
  });
};
