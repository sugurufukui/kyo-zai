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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useAllMaterials } from "hooks/useAllMaterials";

export const MaterialList: FC = memo(() => {
  const { showSnackbar } = useSnackbar();
  // const [materials, setMaterials] = useState([]);

  // const history = useHistory();

  const { getMaterials, materials, loading } = useAllMaterials();
  console.log("getMaterials", { getMaterials });
  console.log("materials", { materials });

  // useEffect(() => getMaterials(), [getMaterials]);
  // // 教材データの取得
  // // カスタムフック化してどこからでも教材のデータをとれるようにしておいたほうがいい？
  // const getMaterialData = async () => {
  //   // ローディングスタート(スピナー用意)

  //   try {
  //     const res = await getAllMaterial();
  //     console.log(res.data);
  //     setMaterials(res.data);
  //   } catch (e) {
  //     console.log(e);
  //     showSnackbar("教材情報の取得に失敗しました。", "error");
  //   } finally {
  //     // ローディング停止
  //   }
  // };

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
            console.log(material)
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ alineItems: "center", textAline: "center" }}
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: 4,
            alineItems: "center",
            textAline: "center",
          }}
        >
          <Card
            sx={{
              width: "260px",
              height: "260px",
              bgcolor: "white",
              boxShadow: "md",
              p: "4",
              m: "2",
              borderRadius: "10px",
              textAline: "center",
              alineItems: "center",
            }}
          >
            <CardMedia
              component="img"
              src="https://source.unsplash.com/random"
            ></CardMedia>
          </Card>
          <Typography>教材の名前</Typography>
          <Typography>説明文</Typography>
          <CardActions sx={{ p: 1 }}>
            <IconButton aria-label="add to favorites">
              <FavoriteBorderIcon />
            </IconButton>
            <CardContent sx={{ p: 1 }}>
              <Typography sx={{ variant: "h5" }}>5</Typography>
            </CardContent>
            <IconButton aria-label="add to comment">
              <ChatBubbleOutlineIcon />
            </IconButton>
            <CardContent sx={{ p: 1 }}>
              <Typography sx={{ variant: "h5" }}>5</Typography>
            </CardContent>
          </CardActions>
          {materials.map((material) => (
            <Link to={`/materials/${material.id}`}>もっと詳しく</Link>
          ))}
        </Box>
      </Modal>
    </>
  );
});
