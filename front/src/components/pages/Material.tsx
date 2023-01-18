import { FC, memo, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { deleteMaterial, getAllMaterial } from "lib/api/material";
import { useSnackbar } from "providers/SnackbarProvider";
import { MaterialCard } from "components/organisms/material/MaterialCard";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Translate } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export const Material: FC = memo(() => {
  const { showSnackbar } = useSnackbar();
  const [materials, setMaterials] = useState([]);

  const history = useHistory();

  useEffect(() => {
    getMaterialData();
  }, []);

  // 教材データの取得
  // カスタムフック化してどこからでも教材のデータをとれるようにしておいたほうがいい？
  const getMaterialData = async () => {
    // ローディングスタート(スピナー用意)

    try {
      const res = await getAllMaterial();
      console.log(res.data);
      setMaterials(res.data);
    } catch (e) {
      console.log(e);
      showSnackbar("教材情報の取得に失敗しました。", "error");
    } finally {
      // ローディング停止
    }
  };

  // 削除ボタン押下時
  const onClickDelete = async (material) => {
    // ローディングスタート
    console.log("click", material.id);
    try {
      const res = await deleteMaterial(material.id);
      // 削除後に残っているデータの再取得
      getMaterialData();
      // 削除の前に確認ボタンが欲しい「削除してもいいですか？」
      showSnackbar("削除しました", "success");
    } catch (e) {
      console.log(e);
      showSnackbar("削除に失敗しました。", "error");
    } finally {
      // ローディング停止
    }
  };
  // 作業しやすいように一旦常時表示しておく
  const [open, setOpen] = useState(true);
  const onClickMaterial = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* <button onClick={() => history.push("/materials/new")}>新規作成</button>
      <table>
        <thead>
          <tr>
            <th>名前</th>
            <th>説明</th>
          </tr>
        </thead>
        {materials.map((material) => (
          <tbody key={material.id}>
            <tr>
              <td>{material.name}</td>
              <td>{material.description}</td>
              <td> */}
      {/* 編集は作成者のみができるようにする。使用箇所はモーダル内と詳細画面 */}
      {/* <Link to={`materials/edit/${material.id}`}>編集する</Link>
              </td>
              <td> */}
      {/* 詳細へボタンは、モーダル内で使用 */}
      {/* <Link to={`/materials/${material.id}`}>詳細へ</Link>
              </td>
              <td>
                <button onClick={() => onClickDelete(material)}>削除</button>
              </td>
            </tr>
          </tbody>
        ))} */}
      {/* </table> */}
      {/* レスポンシブデザインにしたい */}
      <Grid
        container
        spacing={6}
        sx={{
          flexWrap: "wrap",
          alignContent: "center",
          p: { xs: 4, md: 10 },
          m: "4",
        }}
      >
        {materials.map((material) => (
          <Grid key={material.id} sx={{ m: "auto", p: "4" }}>
            <MaterialCard
              imageUrl="https://source.unsplash.com/random"
              materialName={material.name}
              onClick={onClickMaterial}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
});
