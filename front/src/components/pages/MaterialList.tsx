import { FC, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { deleteMaterial } from "lib/api/material";
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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useAllMaterials } from "hooks/useAllMaterials";
import { MaterialDetail } from "components/organisms/material/MaterialModal";

export const MaterialList: FC = memo(() => {
  const { showSnackbar } = useSnackbar();

  const { getMaterials, materials, loading } = useAllMaterials();

  // 教材データの取得
  useEffect(() => {
    getMaterials();
  }, [getMaterials]);

  // 削除ボタン押下時
  const onClickDelete = async (material) => {
    // ローディングスタート
    console.log("click", material.id);
    try {
      const res = await deleteMaterial(material.id);
      // 削除後に残っているデータの再取得
      getMaterials();
      // 削除の前に確認ボタンが欲しい「削除してもいいですか？」
      // muiのDialogのアラートを参照する
      showSnackbar("削除しました", "success");
    } catch (e) {
      console.log(e);
      showSnackbar("削除に失敗しました。", "error");
    } finally {
      // ローディング停止
    }
  };
  // 作業しやすいように一旦常時表示しておく =>(true)
  const [open, setOpen] = useState(true);
  //教材をクリックした時の挙動
  const onClickMaterial = (id: number) => {
    setOpen(true);
    console.log(id);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* 編集は作成者のみができるようにする。使用箇所はモーダル内と詳細画面
      <Link to={`materials/edit/${material.id}`}>編集する</Link>
      詳細へボタンは、モーダル内で使用
      <Link to={`/materials/${material.id}`}>詳細へ</Link>
      <button onClick={() => onClickDelete(material)}>削除</button>
      レスポンシブデザインにしたい */}
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
              id={material.id}
              imageUrl="https://source.unsplash.com/random"
              materialName={material.name}
              onClick={onClickMaterial}
            />
          </Grid>
        ))}
      </Grid>
      <MaterialDetail open={open} onClose={handleClose} />
    </>
  );
});
