import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

import { Box, Button, CircularProgress, Grid, Pagination } from "@mui/material";

import { MaterialCard } from "components/organisms/material/MaterialCard";
import { MaterialModal } from "components/organisms/material/MaterialModal";
import { useAllMaterials } from "hooks/material/useAllMaterials";
import { useSelectLikedMaterial } from "hooks/material/useSelectLikedMaterial";
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

export const Liked: FC<Props> = memo((props) => {
  const { initialLikeCount } = props;
  const { getLikedMaterials, likedMaterials, loading } = useAllMaterials();
  const { currentUser } = useContext(AuthContext);
  const { onSelectLikedMaterial, selectedLikedMaterial } = useSelectLikedMaterial();
  console.log("選択した教材", selectedLikedMaterial);

  const history = useHistory();

  //ページネーション関係
  const count = Math.ceil(likedMaterials.length / 8);
  const [page, setPage] = useState(1);
  const handleChange = useCallback(
    (event, value) => {
      setPage(paginator(likedMaterials, value, 8).page);
    },
    [likedMaterials]
  );

  // いいね関係
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  //モーダル関係
  const [open, setOpen] = useState(false);
  //教材をクリックした時の挙動 クリック時にmaterial.idが渡るようにidを付与
  const onClickMaterial = useCallback(
    (id: number) => {
      // 教材を特定する為にuseSelectMaterialのidとmaterialを与える
      onSelectLikedMaterial({ id, likedMaterials });
      setOpen(true);
      console.log(id, likedMaterials);
    },
    [likedMaterials, onSelectLikedMaterial]
  );

  const handleClose = useCallback(() => setOpen(false), []);

  // 教材データの取得
  useEffect(() => {
    getLikedMaterials();
  }, [getLikedMaterials]);

  // いいねした教材があれば表示して、なければないことを表示する
  const MaterialData = memo(() => {
    if (likedMaterials.length >= 1) {
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
            {paginator(likedMaterials, page, 8).data.map((likedMaterial) => (
              <Grid key={likedMaterial.id} sx={{ m: "auto", p: "4" }}>
                <MaterialCard
                  id={likedMaterial.id}
                  imageUrl={likedMaterial.image.url}
                  materialName={likedMaterial.name}
                  onClick={onClickMaterial}
                  materialId={likedMaterial.id}
                  currentUser={currentUser}
                  initialLikeCount={likeCount}
                />
              </Grid>
            ))}
          </Grid>
          <MaterialModal
            open={open}
            onClose={handleClose}
            material={selectedLikedMaterial}
            materialId={selectedLikedMaterial?.id}
            currentUser={currentUser}
            imageUrl={selectedLikedMaterial?.image.url}
            initialLikeCount={likeCount}
          />
          <Box style={{ display: "flex", justifyContent: "center" }} sx={{ mt: 3 }}>
            <Pagination count={count} page={page} onChange={handleChange} color="primary" />
          </Box>
        </>
      );
    } else {
      return <h2>いいねした教材はありません</h2>;
    }
  });

  return (
    <>
      <h1>{currentUser?.name}さんがいいねした教材一覧</h1>
      <Button variant="outlined" onClick={() => history.goBack()}>
        戻る
      </Button>
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
