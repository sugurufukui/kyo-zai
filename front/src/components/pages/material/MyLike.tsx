import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { MaterialCard } from "components/organisms/material/MaterialCard";
import { Grid } from "@mui/material";
import { useAllMaterials } from "hooks/useAllMaterials";
import { MaterialModal } from "components/organisms/material/MaterialModal";
import { useSelectMaterial } from "hooks/useSelectMaterial";
import { AuthContext } from "providers/AuthProvider";
import { useHistory } from "react-router";

//ログインユーザー教材(/user/materials)一覧画面やいいねした教材一覧と共有している項目はコンポーネント化して切り分けたい！！

export const MyLike: FC = memo(() => {
  // const { showSnackbar } = useSnackbar();
  const { currentUser } = useContext(AuthContext);
  const { getLikeMaterials, likeMaterials, loading } = useAllMaterials();
  const { onSelectMaterial, selectedMaterial } = useSelectMaterial();

  const history = useHistory();

  // 教材データの取得
  useEffect(() => {
    getLikeMaterials();
  }, [getLikeMaterials]);

  //モーダル関係
  // 作業しやすいように一旦常時表示しておく =>(true)
  const [open, setOpen] = useState(false);
  //教材をクリックした時の挙動
  const onClickMaterial = () => alert("ここでモーダルオープン");
  // useCallback(
  //   (id: number) => {
  //     // 教材を特定する為にuseSelectMaterialのidとmaterialを与える
  //     onSelectMaterial({ id, materials });
  //     setOpen(true);
  //     console.log(id);
  // console.log(selectedMaterial);
  //   },
  //   [onSelectMaterial]
  // );
  const handleClose = () => setOpen(false);

  // いいねした教材があれば表示して、なければないことを表示する
  // TypeError: Cannot read properties of null (reading 'length')
  // => そのため lengthの後に？追加
  const MaterialData = () => {
    if (likeMaterials.length >= 1) {
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
            {/* 全一覧でいいね機能を表示させるために一度コメントアウト */}
            {/* {likeMaterials.map((likeMaterial) => (
              <Grid key={likeMaterial.id} sx={{ m: "auto", p: "4" }}>
                <MaterialCard
                  id={likeMaterial.id}
                  imageUrl="https://source.unsplash.com/random"
                  // imageUrl={material.image}
                  materialName={likeMaterial.name}
                  onClick={onClickMaterial}
                  materialId={material.id}
                  currentUser={currentUser}
                  initialLikeCount={likeCount}
                />
              </Grid>
            ))} */}
          </Grid>
          ;
          {/* 全一覧から推移するモーダル表示ででいいね機能を表示させるために一度コメントアウト */}
          {/* <MaterialModal
            open={open}
            onClose={handleClose}
            material={selectedMaterial}
          /> */}
        </>
      );
      {
        /* 編集は作成者のみができるようにする。使用箇所はモーダル内と詳細画面
      レスポンシブデザインにしたい */
      }
    } else {
      return <h2>いいねした教材はありません</h2>;
    }
  };

  return (
    <>
      <h1>{currentUser.name}さんがいいねした教材一覧</h1>
      <button onClick={() => history.goBack}>戻る</button>
      <MaterialData />
    </>
  );
});
