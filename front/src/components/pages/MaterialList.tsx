import { FC, memo, useCallback, useContext, useEffect, useState } from "react";

// import { deleteMaterial } from "lib/api/material";
// import { useSnackbar } from "providers/SnackbarProvider";
import { MaterialCard } from "components/organisms/material/MaterialCard";
import { Grid } from "@mui/material";
import { useAllMaterials } from "hooks/useAllMaterials";
import { MaterialModal } from "components/organisms/material/MaterialModal";
import { useSelectMaterial } from "hooks/useSelectMaterial";
import { AuthContext } from "providers/AuthProvider";
import { likedCheck } from "lib/api/like";
import { useLike } from "hooks/useLike";
// import { LikeButton } from "components/molecules/LikeButton";

//ログインユーザー教材(/user/materials)一覧画面と共有している項目はコンポーネント化して切り分けたい！！
type Props = {
  initialLikeCount: number;
};

export const MaterialList: FC<Props> = memo((props) => {
  const { initialLikeCount } = props;
  // const { showSnackbar } = useSnackbar();
  const { getMaterials, materials, loading } = useAllMaterials();
  const { currentUser } = useContext(AuthContext);
  const { onSelectMaterial, selectedMaterial } = useSelectMaterial();
  const { liked, likeCount, handleGetLike, clickToLike, clickToUnLike } =
    useLike(props);

  // // いいねの数の情報
  // const [likeCount, setLikeCount] = useState(0);

  //モーダル関係
  // 作業しやすいように一旦常時表示しておく =>(true)
  const [open, setOpen] = useState(false);
  //教材をクリックした時の挙動 クリック時にmaterial.idが渡るようにidを付与
  const onClickMaterial = useCallback(
    (id: number) => {
      // 教材を特定する為にuseSelectMaterialのidとmaterialを与える
      onSelectMaterial({ id, materials });
      console.log(selectedMaterial);
      setOpen(true);
    },
    [materials, onSelectMaterial, selectedMaterial]
  );
  const handleClose = () => setOpen(false);

  // //いいね確認API
  // const handleGetLike = async () => {
  //   try {
  //     // ここのlikedCheckのidが取れていないから、404エラーとなっている
  //     const res = await likedCheck(materials);
  //     console.log(res.data);
  //     setLikeCount(res.data.likeCount);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // 教材データの取得
  useEffect(() => {
    getMaterials();
    handleGetLike();
  }, [getMaterials, handleGetLike]);

  return (
    <>
      {/* 編集は作成者のみができるようにする。使用箇所はモーダル内と詳細画面
      レスポンシブデザインにしたい */}
      <Grid
        container
        spacing={6}
        sx={{
          flexWrap: "wrap",
          // alignContent: "center",
          p: { xs: 3, md: 6 },
        }}
      >
        {materials.map((material) => (
          <Grid
            key={material.id}
            sx={{
              m: "auto",
              p: "4",
            }}
          >
            <MaterialCard
              id={material.id}
              imageUrl="https://source.unsplash.com/random"
              // imageUrl={material.image}
              materialName={material.name}
              onClick={onClickMaterial}
              // materialId={material.id}
              // currentUser={currentUser}
              initialLikeCount={likeCount}
            />
          </Grid>
        ))}
      </Grid>
      {/* idの値が取れずに画面表示されないので一時コメントアウト */}
      <MaterialModal
        open={open}
        onClose={handleClose}
        material={selectedMaterial}
        // materialId={materials[0].id}
        // currentUser={currentUser}
        initialLikeCount={likeCount}
      />
    </>
  );
});
