import { Box, Button, CircularProgress, Grid, Link } from "@mui/material";
import { MaterialCard } from "components/organisms/material/MaterialCard";
import { MaterialModal } from "components/organisms/material/MaterialModal";
import { useAllMaterials } from "hooks/useAllMaterials";
import { useSelectMyMaterial } from "hooks/useSelectMyMaterial";

import { AuthContext } from "providers/AuthProvider";
import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

type Props = {
  initialLikeCount: number;
};

export const MyMaterial: FC<Props> = memo((props) => {
  const { initialLikeCount } = props;
  const { getMyMaterials, myMaterials, loading } = useAllMaterials();
  const { currentUser } = useContext(AuthContext);
  const { onSelectMyMaterial, selectedMyMaterial } = useSelectMyMaterial();

  const history = useHistory();

  // いいね関係
  //いいねの数を管理
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  // //モーダル関係
  const [open, setOpen] = useState(false);
  // //教材をクリックした時の挙動 クリック時にmaterial.idが渡るようにidを付与
  const onClickMaterial = useCallback(
    (id: number) => {
      // 教材を特定する為にuseSelectMaterialのidとmaterialを与える
      onSelectMyMaterial({ id, myMaterials });
      setOpen(true);
      console.log(id);
      console.log(myMaterials);
    },
    [myMaterials, onSelectMyMaterial]
  );

  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    getMyMaterials();
  }, [getMyMaterials]);

  // 投稿した教材があれば表示して、なければないことを表示する
  const MaterialData = useCallback(() => {
    // ログインユーザーの教材が1つ以上あればそのユーザーの教材のみを表示
    if (myMaterials.length >= 1) {
      return (
        <>
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
            {myMaterials.map((myMaterial) => (
              <Grid key={myMaterial.id} sx={{ m: "auto", p: "4" }}>
                <MaterialCard
                  id={myMaterial.id}
                  imageUrl={myMaterial.image.url}
                  materialName={myMaterial.name}
                  onClick={onClickMaterial}
                  materialId={myMaterial.id}
                  currentUser={currentUser}
                  initialLikeCount={likeCount}
                />
              </Grid>
            ))}
          </Grid>
          <MaterialModal
            open={open}
            onClose={handleClose}
            material={selectedMyMaterial}
            materialId={selectedMyMaterial?.id}
            currentUser={currentUser}
            imageUrl={selectedMyMaterial?.image.url}
            initialLikeCount={likeCount}
          />
        </>
      );
    } else {
      return (
        <>
          <h2>投稿した教材はありません</h2>
          <h2>ぜひ投稿してみましょう！！</h2>
          <Button onClick={() => history.push("/materials/new")}>
            教材を投稿してみる
          </Button>
        </>
      );
    }
  }, [
    currentUser,
    handleClose,
    history,
    likeCount,
    myMaterials,
    onClickMaterial,
    open,
    onSelectMyMaterial,
  ]);

  return (
    <>
      <h1>{currentUser.email}さんの投稿一覧</h1>
      <button onClick={() => history.goBack}>戻る</button>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <MaterialData />
      )}
    </>
  );
});
