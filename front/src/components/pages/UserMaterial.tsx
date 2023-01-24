import { Grid } from "@mui/material";
import { MaterialCard } from "components/organisms/material/MaterialCard";
import { MaterialModal } from "components/organisms/material/MaterialModal";
import { useSelectMaterial } from "hooks/useSelectMaterial";

import { getUserMaterials } from "lib/api/user";
import { AuthContext } from "providers/AuthProvider";
import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { MaterialType } from "types/api/materialType";

export const UserMaterial: FC = memo(() => {
  const { currentUser, loading, isSignedIn } = useContext(AuthContext);
  const [userMaterials, setUserMaterials] = useState<Array<MaterialType>>([]);
  const { onSelectMaterial, selectedMaterial } = useSelectMaterial();

  const history = useHistory();

  useEffect(() => {
    handleGetUserMaterials();
  }, [currentUser]);

  // ログインユーザーの教材データの取得
  const handleGetUserMaterials = async () => {
    if (!loading) {
      if (isSignedIn) {
        const res = await getUserMaterials(currentUser.id);
        console.log(res.data);
        setUserMaterials(res.data);
      } else {
        <Redirect to="/signin" />;
      }
    }
  };

  //モーダル関係
  const [open, setOpen] = useState(false);
  //教材をクリックした時の挙動
  const onClickMaterial = () => alert("ここでモーダルオープン");

  // useCallback(
  //   (id: number) => {
  //     // 教材を特定する為にuseSelectMaterialのidとmaterialを与える
  //     onSelectMaterial({ id, userMaterials });
  //     setOpen(true);
  //     console.log(id);
  //   },
  //   [userMaterials, onSelectMaterial]
  // );
  const handleClose = () => setOpen(false);

  const UserTable = () => {
    // ログインユーザーの教材が1つ以上あればそのユーザーの教材のみを表示
    if (userMaterials.length >= 1) {
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
            {userMaterials.map((userMaterial) => (
              <Grid key={userMaterial.id} sx={{ m: "auto", p: "4" }}>
                <MaterialCard
                  id={userMaterial.id}
                  imageUrl="https://source.unsplash.com/random"
                  // imageUrl={material.image}
                  materialName={userMaterial.name}
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
    } else {
      return <h2>投稿した教材はありません</h2>;
    }
  };

  return (
    <>
      <h1>{currentUser.email}の投稿一覧</h1>
      <button onClick={() => history.goBack}>戻る</button>
      <UserTable />
    </>
  );
});
