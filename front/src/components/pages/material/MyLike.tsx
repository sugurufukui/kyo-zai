import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { MaterialCard } from "components/organisms/material/MaterialCard";
import { Grid } from "@mui/material";
import { useAllMaterials } from "hooks/useAllMaterials";
import { MaterialModal } from "components/organisms/material/MaterialModal";
import { AuthContext } from "providers/AuthProvider";
import { useHistory } from "react-router";
import { useSelectLikeMaterial } from "hooks/useSelectLikeMaterial";

//ログインユーザー教材(/user/materials)一覧画面やいいねした教材一覧と共有している項目はコンポーネント化して切り分けたい！！
type Props = {
  initialLikeCount: number;
};

export const MyLike: FC<Props> = memo((props) => {
  const { initialLikeCount } = props;
  const { getLikeMaterials, likeMaterials, loading } = useAllMaterials();
  const { currentUser } = useContext(AuthContext);
  const { onSelectLikeMaterial, selectedLikeMaterial } =
    useSelectLikeMaterial();
  console.log(selectedLikeMaterial);

  const history = useHistory();

  // いいね関係
  //いいねの数を管理
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  //モーダル関係
  const [open, setOpen] = useState(false);
  //教材をクリックした時の挙動 クリック時にmaterial.idが渡るようにidを付与
  const onClickMaterial = useCallback(
    (id: number) => {
      // 教材を特定する為にuseSelectMaterialのidとmaterialを与える
      onSelectLikeMaterial({ id, likeMaterials });
      setOpen(true);
      console.log(id);
      console.log(likeMaterials);
    },
    [likeMaterials, onSelectLikeMaterial]
  );

  const handleClose = useCallback(() => setOpen(false), []);

  // 教材データの取得
  useEffect(() => {
    getLikeMaterials();
  }, [getLikeMaterials]);

  // いいねした教材があれば表示して、なければないことを表示する
  const MaterialData = useCallback(() => {
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
            {likeMaterials.map((likeMaterial) => (
              <Grid key={likeMaterial.id} sx={{ m: "auto", p: "4" }}>
                <MaterialCard
                  id={likeMaterial.id}
                  imageUrl={likeMaterial.image.url}
                  materialName={likeMaterial.name}
                  onClick={onClickMaterial}
                  materialId={likeMaterial.id}
                  currentUser={currentUser}
                  initialLikeCount={likeCount}
                />
              </Grid>
            ))}
          </Grid>
          <MaterialModal
            open={open}
            onClose={handleClose}
            material={selectedLikeMaterial}
            materialId={selectedLikeMaterial?.id}
            currentUser={currentUser}
            imageUrl={selectedLikeMaterial?.image.url}
            initialLikeCount={likeCount}
          />
        </>
      );
    } else {
      return <h2>いいねした教材はありません</h2>;
    }
  }, [
    // currentUser,
    handleClose,
    // likeCount,
    likeMaterials,
    // onClickMaterial,
    open,
    // selectedLikeMaterial,
  ]);

  return (
    <>
      <h1>{currentUser.name}さんがいいねした教材一覧</h1>
      <button onClick={() => history.goBack}>戻る</button>
      <MaterialData />
    </>
  );
});
