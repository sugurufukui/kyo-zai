import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import PostAddIcon from "@mui/icons-material/PostAdd";
import { Box, Button, CircularProgress, Grid, Pagination } from "@mui/material";

import { MaterialCard } from "components/organisms/material/MaterialCard";
import { MaterialModal } from "components/organisms/material/MaterialModal";
import { useAllMaterials } from "hooks/material/useAllMaterials";
import { useSelectMaterial } from "hooks/material/useSelectMaterial";
import { AuthContext } from "providers/AuthProvider";

// ページネーション設定
export const paginator = (items, current_page, per_page_items) => {
  let page = current_page || 1,
    per_page = per_page_items,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page_items),
    total_pages = Math.ceil(items.length / per_page);
  console.log(`${page}ページ目を表示中。（${offset}番目から${offset + per_page_items}番目の教材）`);

  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems,
  };
};

type Props = {
  initialLikeCount: number;
};

export const List: FC<Props> = memo((props) => {
  const { initialLikeCount } = props;
  const { getMaterials, materials, loading } = useAllMaterials();
  const { currentUser } = useContext(AuthContext);
  const { onSelectMaterial, selectedMaterial } = useSelectMaterial();
  console.log("選択した教材", selectedMaterial);

  const history = useHistory();

  //ページネーション関係
  const count = Math.ceil(materials.length / 8);
  const [page, setPage] = useState(1);
  const handleChange = useCallback(
    (event, value) => {
      setPage(paginator(materials, value, 8).page);
    },
    [materials]
  );

  // いいね関係
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  //モーダル関係
  const [open, setOpen] = useState(false);
  //教材をクリックした時の挙動 クリック時にmaterial.idが渡るようにidを付与
  const onClickMaterial = useCallback(
    (id: number) => {
      // 教材を特定する為にuseSelectMaterialのidとmaterialを与える
      onSelectMaterial({ id, materials });
      setOpen(true);
      console.log(id, materials);
    },
    [materials, onSelectMaterial]
  );

  const handleClose = useCallback(() => setOpen(false), []);

  // 教材データの取得
  useEffect(() => {
    getMaterials();
  }, [getMaterials]);

  // 教材があれば表示して、なければないことを表示する
  const MaterialData = memo(() => {
    if (materials.length >= 1) {
      return (
        <>
          <Grid
            container
            display="flex"
            alignItems="center"
            sx={{
              flexWrap: "wrap",
            }}
          >
            {paginator(materials, page, 8).data.map((material) => (
              <Grid key={material.id} sx={{ m: "auto", p: "4" }}>
                <MaterialCard
                  id={material.id}
                  imageUrl={material.image.url}
                  materialName={material.name}
                  onClick={onClickMaterial}
                  materialId={material.id}
                  currentUser={currentUser}
                  initialLikeCount={likeCount}
                />
              </Grid>
            ))}
          </Grid>
          <MaterialModal
            open={open}
            onClose={handleClose}
            material={selectedMaterial}
            materialId={selectedMaterial?.id}
            currentUser={currentUser}
            imageUrl={selectedMaterial?.image.url}
            initialLikeCount={likeCount}
          />
          <Box style={{ display: "flex", justifyContent: "center" }} sx={{ mt: 3 }}>
            <Pagination count={count} page={page} onChange={handleChange} color="primary" />
          </Box>
        </>
      );
    } else {
      return (
        <>
          <h2>投稿されている教材はありません</h2>
          <h2>ぜひ投稿してみましょう！！</h2>
          <Box sx={{ mt: 5 }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => history.push("/materials/new")}
            >
              <PostAddIcon /> 教材を投稿してみる
            </Button>
          </Box>
        </>
      );
    }
  });

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <MaterialData />
      )}
    </>
  );
});
