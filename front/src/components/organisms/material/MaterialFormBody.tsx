// import { Input } from "@mui/material";
// // import { PostForm } from "components/molecules/PhotosUpload";
// import { PhotosUpload } from "components/molecules/PhotosUpload";

// import { FC, memo, useMemo, useState } from "react";

// type Props = {
//   onClickSubmit: any;
//   handleChange: any;
//   value: any;
//   buttonType: string;
//   // handleGetPosts: any;
// };

// export const MaterialFormBody: FC<Props> = memo((props) => {
//   const {
//     onClickSubmit,
//     handleChange,
//     value,
//     buttonType,
//     // handleGetPosts
//   } = props;
//   return (
//     <>
//       <form>
//         <div>
//           <label htmlFor="name">名前</label>
//           <input
//             type="text"
//             name="name"
//             id="name"
//             onChange={(e) => handleChange(e)}
//             value={value.name}
//           />
//         </div>
//         <div>
//           <label htmlFor="description">説明文</label>
//           <input
//             type="description"
//             name="description"
//             id="description"
//             onChange={(e) => handleChange(e)}
//             value={value.description}
//           />

//           <PhotosUpload fileName="教材の写真を選択" />
//           {/* <PostForm handleGetPosts={handleGetPosts} /> */}

//           <input
//             type="submit"
//             value={buttonType}
//             onClick={(e) => onClickSubmit(e)}
//           />
//         </div>
//       </form>
//     </>
//   );
// });

import React, { FC, useCallback, useState } from "react";

import { createMaterial } from "lib/api/material";
import { Button, IconButton, Input, TextField } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

const borderStyles = {
  bgcolor: "background.paper",
  border: 1,
};

type Props = {
  handleGetPosts: Function;
  // value: any;
  buttonType: string;
};

export const MaterialFormBody: FC<Props> = (props) => {
  const { handleGetPosts, buttonType } = props;

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>("");

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0];
    setImage(file);
  }, []);

  // プレビュー機能
  const previewImage = useCallback((e) => {
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  }, []);

  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);

    return formData;
  };

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = createFormData();

    await createMaterial(data).then(() => {
      setName("");
      setDescription("");
      setPreview("");
      setImage(undefined);
      handleGetPosts();
    });
  };

  return (
    <>
      <form noValidate onSubmit={handleCreatePost}>
        <TextField
          type="text"
          name="name"
          id="name"
          placeholder="教材の名前"
          variant="outlined"
          fullWidth
          rows="2"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
        <TextField
          type="description"
          name="description"
          id="description"
          placeholder="教材の説明文"
          variant="outlined"
          multiline
          fullWidth
          rows="4"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(e.target.value);
          }}
        />
        <div>
          <label htmlFor="icon-button-file">
            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              hidden
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                uploadImage(e);
                previewImage(e);
              }}
            />
            <IconButton color="inherit" component="span">
              <PhotoCameraIcon />
            </IconButton>
          </label>
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="inherit"
            disabled={!name || !description || !image}
            value={buttonType}
          >
            Post
          </Button>
        </div>
      </form>
      {preview ? (
        <Box sx={{ ...borderStyles, borderRadius: 1, borderColor: "grey.400" }}>
          <IconButton color="inherit" onClick={() => setPreview("")}>
            <CloseIcon />
          </IconButton>
          <img src={preview} alt="preview img" />
        </Box>
      ) : null}
    </>
  );
};
