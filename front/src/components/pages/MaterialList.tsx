import { FC, memo, useCallback, useEffect, useState } from "react";

// import { deleteMaterial } from "lib/api/material";
// import { useSnackbar } from "providers/SnackbarProvider";
import { MaterialCard } from "components/organisms/material/MaterialCard";
import { Grid } from "@mui/material";
import { useAllMaterials } from "hooks/useAllMaterials";
import { MaterialModal } from "components/organisms/material/MaterialModal";
import { useSelectMaterial } from "hooks/useSelectMaterial";

//ログインユーザー教材(/user/materials)一覧画面と共有している項目はコンポーネント化して切り分けたい！！

export const MaterialList: FC = memo(() => {
  // const { showSnackbar } = useSnackbar();
  const { getMaterials, materials, loading } = useAllMaterials();
  const { onSelectMaterial, selectedMaterial } = useSelectMaterial();
  console.log(selectedMaterial);

  // 教材データの取得
  useEffect(() => {
    getMaterials();
  }, [getMaterials]);

  //モーダル関係
  // 作業しやすいように一旦常時表示しておく =>(true)
  const [open, setOpen] = useState(false);
  //教材をクリックした時の挙動
  const onClickMaterial = useCallback(
    (id: number) => {
      // 教材を特定する為にuseSelectMaterialのidとmaterialを与える
      onSelectMaterial({ id, materials });
      setOpen(true);
      console.log(id);
    },
    [materials, onSelectMaterial]
  );
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* 編集は作成者のみができるようにする。使用箇所はモーダル内と詳細画面
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
              // imageUrl={material.image}
              materialName={material.name}
              onClick={onClickMaterial}
            />
          </Grid>
        ))}
      </Grid>
      <MaterialModal
        open={open}
        onClose={handleClose}
        material={selectedMaterial}
      />
    </>
  );
});
