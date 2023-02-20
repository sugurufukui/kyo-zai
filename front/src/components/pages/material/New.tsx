import { FC, memo, useState } from "react";
import { MaterialFormBody } from "components/organisms/material/MaterialFormBody";
import { createMaterial, getAllMaterial } from "lib/api/material";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "providers/SnackbarProvider";
import { MaterialType } from "types/api/materialType";

export const New: FC = memo(() => {
  // const [value, setValue] = useState([]);
  const history = useHistory();
  // const { showSnackbar } = useSnackbar();

  // const handleChange = (e) => {
  //   setValue({
  //     ...value,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // const [file, setFile] = useState<File | null>(null);

  // // ここに画像登録についてのことも隠蔽する？
  // const onClickSubmit = () => {
  //   const Submit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       // const res = createMaterial(value);
  //       // console.log(res);・
  //       // 登録できたら一覧画面へ推移
  //       history.push("/materials");
  //       showSnackbar("教材を登録しました", "success");
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   // apiとの連携のためにデータを送る
  //   const createFormData = () => {
  //     const formData = new FormData();
  //     // file形式にコンバート
  //     // formData.append("Railsのテーブル名[カラム名]", ファイルが格納された変数);
  //     formData.append("material[image]", file!);
  //     return formData;
  //   };
  // };

  const [materials, setMaterials] = useState<MaterialType[]>([]);

  const handleGetPosts = async () => {
    const { data } = await getAllMaterial();
    setMaterials(data.materials);
    console.log(data);
  };

  return (
    <>
      <MaterialFormBody
        // handleChange={handleChange}
        // onClickSubmit={onClickSubmit}
        handleGetPosts={handleGetPosts}
        // value={value}
        buttonType="登録"
      />
      <button onClick={() => history.goBack()}>戻る</button>
    </>
  );
});
