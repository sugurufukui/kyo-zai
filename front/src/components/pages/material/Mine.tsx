import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { MaterialCard } from "components/organisms/material/MaterialCard";
import { MaterialModal } from "components/organisms/material/MaterialModal";
import { useAllMaterials } from "hooks/useAllMaterials";
import { useSelectMineMaterial } from "hooks/useSelectMineMaterial";
import { AuthContext } from "providers/AuthProvider";

import PostAddIcon from "@mui/icons-material/PostAdd";
import { Box, Button, CircularProgress, Grid, Pagination } from "@mui/material";

export const paginator = (items, current_page, per_page_items) => {
  let page = current_page || 1, // page = 現在のページまたは1ページ目
    per_page = per_page_items, // 1ページに表示する数を指定
    offset = (page - 1) * per_page, //  ページの先頭の教材(何番目のアイテムから表示するか)(ページ数 - 1 * 1ページに表示する数) 3ページ目の場合は、(3-1)*8=16 ページの先頭の教材は16番目
    paginatedItems = items.slice(offset).slice(0, per_page_items), //ページ先頭教材でslice ,0から1ページに表示する数(8)を要素を取り出し
    total_pages = Math.ceil(items.length / per_page); // 全ページ数 ＝ 全教材数から1ページに表示する教材(8)を割った値を繰り上げた値
  console.log(`${page}ページ目を表示中。（${offset}番目から${offset + per_page_items}番目の教材）`);

  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null, //現在のページ数-1ができるなら表示させて押下時にページ数を-1に できないのであれば、非活性にする
    next_page: total_pages > page ? page + 1 : null, //現在のページよりも全ページ数の方が大きければ、押下可能。できない場合は非活性。
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems,
  };
};

type Props = {
  initialLikeCount: number;
};

export const Mine: FC<Props> = memo((props) => {
  const { initialLikeCount } = props;
  const { getMineMaterials, MineMaterials, loading } = useAllMaterials();
  const { currentUser } = useContext(AuthContext);
  const { onSelectMineMaterial, selectedMineMaterial } = useSelectMineMaterial();

  const history = useHistory();

  //ページネーション関係
  const count = Math.ceil(MineMaterials.length / 8);
  const [page, setPage] = useState(1);
  const handleChange = useCallback(
    (event, value) => {
      setPage(paginator(MineMaterials, value, 8).page);
    },
    [MineMaterials]
  );

  // いいね関係
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  // //モーダル関係
  const [open, setOpen] = useState(false);
  // //教材をクリックした時の挙動 クリック時にmaterial.idが渡るようにidを付与
  const onClickMaterial = useCallback(
    (id: number) => {
      // 教材を特定する為にuseSelectMaterialのidとmaterialを与える
      onSelectMineMaterial({ id, MineMaterials });
      setOpen(true);
      console.log(id);
      console.log(MineMaterials);
    },
    [MineMaterials, onSelectMineMaterial]
  );

  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    getMineMaterials();
  }, [getMineMaterials]);

  // 投稿した教材があれば表示して、なければないことを表示する
  const MaterialData = useCallback(() => {
    if (MineMaterials.length >= 1) {
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
            {paginator(MineMaterials, page, 8).data.map((MineMaterial) => (
              <Grid key={MineMaterial.id} sx={{ m: "auto", p: "4" }}>
                <MaterialCard
                  id={MineMaterial.id}
                  imageUrl={MineMaterial.image.url}
                  materialName={MineMaterial.name}
                  onClick={onClickMaterial}
                  materialId={MineMaterial.id}
                  currentUser={currentUser}
                  initialLikeCount={likeCount}
                />
              </Grid>
            ))}
          </Grid>
          <MaterialModal
            open={open}
            onClose={handleClose}
            material={selectedMineMaterial}
            materialId={selectedMineMaterial?.id}
            currentUser={currentUser}
            imageUrl={selectedMineMaterial?.image.url}
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
          <h2>投稿した教材はありません</h2>
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
  }, [
    count,
    currentUser,
    handleChange,
    handleClose,
    history,
    likeCount,
    MineMaterials,
    onClickMaterial,
    open,
    page,
    selectedMineMaterial,
  ]);

  return (
    <>
      <h1>{currentUser?.name}さんの投稿一覧</h1>
      <Button variant="outlined" onClick={() => history.goBack()}>
        戻る
      </Button>{" "}
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
