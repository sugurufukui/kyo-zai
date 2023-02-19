import { IconButton, Input } from "@mui/material";
import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";

import { ImagePreview } from "./ImagePreview";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "providers/SnackbarProvider";

type Props = { fileName: string };

// 画像を選択してプレビューするコンポーネント
export const PhotosUpload: FC<Props> = (props) => {
  const { fileName } = props;
  const { showSnackbar } = useSnackbar();

  const [file, setFile] = useState<File | null>(null);

  const changeFileHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (
        e.currentTarget?.files &&
        e.currentTarget.files[0] &&
        // image以外のファイルはnullにしてプレビューさせずにアラート表示;
        e.currentTarget.files[0].type.includes("image/")
      ) {
        setFile(e.currentTarget.files[0]);
      } else {
        setFile(null);
        showSnackbar("そのファイルは登録できません", "error");
        return;
      }
    },
    []
  );

  // 画像選択取り消し
  const resetFile = useCallback(() => {
    setFile(null);
  }, []);

  // inputの代替ボタン用
  const inputRef = useRef(null);

  const fileUpLoad = () => {
    console.log(inputRef.current);
    inputRef.current.click();
  };

  // apiとの連携のためにデータを送る
  const createFormData = () => {
    const formData = new FormData();
    // file形式にコンバート
    // formData.append("Railsのテーブル名[カラム名]", ファイルが格納された変数);
    formData.append("material[image]", file!);
    return formData;
  };

  // 他の部分のようにclient.tsを使用して記述する
  const postFile = async () => {
    const data = createFormData();
    await axios
      .post(
        "http://localhost:3001/api/v1/post_image",
        data
        // , {
        //   headers: {
        //     "content-type": "multipart/form-data",
        //   },
        // }
      )
      .then((res) => {
        //成功したときの処理
        console.log("画像投稿できました");
        console.log(file);
        console.log(data);
      })
      .catch((e) => {
        console.log(e, "画像投稿できませんでした");
      });
  };

  return (
    <>
      <div>
        <Button onClick={fileUpLoad}>{fileName}</Button>
        <Button
          size="medium"
          onClick={() => {
            postFile();
          }}
        >
          railsファイルに追加
        </Button>
        <label htmlFor="contained-button-file">
          <input
            id="contained-button-file"
            type="file"
            ref={inputRef}
            onChange={changeFileHandler}
            hidden
          />
        </label>
        {file && (
          <div>
            <Box>
              <Box sx={{ height: 0, textAlign: "right" }}>
                <IconButton onClick={resetFile}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <ImagePreview file={file} height={260} />
            </Box>
          </div>
        )}
      </div>
    </>
  );
};

// import React, { useCallback, useState } from "react";

// import { createMaterial } from "lib/api/material";
// import { Button, IconButton, Input, TextField } from "@mui/material";
// import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
// import { Box } from "@mui/system";
// import CloseIcon from "@mui/icons-material/Close";

// const borderStyles = {
//   bgcolor: "background.paper",
//   border: 1,
// };

// interface PostFormProps {
//   handleGetPosts: Function;
// }

// export const PostForm = ({ handleGetPosts }: PostFormProps) => {
//   const [name, setName] = useState<string>("");
//   const [description, setDescription] = useState<string>("");
//   const [image, setImage] = useState<File>();
//   const [preview, setPreview] = useState<string>("");

//   const uploadImage = useCallback((e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   }, []);

//   // プレビュー機能
//   const previewImage = useCallback((e) => {
//     const file = e.target.files[0];
//     setPreview(window.URL.createObjectURL(file));
//   }, []);

//   // FormData形式でデータを作成
//   const createFormData = (): FormData => {
//     const formData = new FormData();

//     formData.append("name", name);
//     formData.append("description", description);
//     if (image) formData.append("image", image);

//     return formData;
//   };

//   const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const data = createFormData();

//     await createMaterial(data).then(() => {
//       setName("");
//       setDescription("");
//       setPreview("");
//       setImage(undefined);
//       handleGetPosts();
//     });
//   };

//   return (
//     <>
//       <form noValidate onSubmit={handleCreatePost}>
//         <TextField
//           type="text"
//           name="name"
//           id="name"
//           placeholder="教材の名前"
//           variant="outlined"
//           fullWidth
//           rows="2"
//           value={name}
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//             setName(e.target.value);
//           }}
//         />
//         <TextField
//           type="description"
//           name="description"
//           id="description"
//           placeholder="教材の説明文"
//           variant="outlined"
//           multiline
//           fullWidth
//           rows="4"
//           value={description}
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//             setDescription(e.target.value);
//           }}
//         />
//         <div>
//           <label htmlFor="icon-button-file">
//             <input
//               accept="image/*"
//               id="icon-button-file"
//               type="file"
//               hidden
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                 uploadImage(e);
//                 previewImage(e);
//               }}
//             />
//             <IconButton color="inherit" component="span">
//               <PhotoCameraIcon />
//             </IconButton>
//           </label>
//         </div>
//         <div>
//           <Button
//             type="submit"
//             variant="contained"
//             size="large"
//             color="inherit"
//             disabled={!name || !description || !image}
//           >
//             Post
//           </Button>
//         </div>
//       </form>
//       {preview ? (
//         <Box sx={{ ...borderStyles, borderRadius: 1, borderColor: "grey.400" }}>
//           <IconButton color="inherit" onClick={() => setPreview("")}>
//             <CloseIcon />
//           </IconButton>
//           <img src={preview} alt="preview img" />
//         </Box>
//       ) : null}
//     </>
//   );
// };
