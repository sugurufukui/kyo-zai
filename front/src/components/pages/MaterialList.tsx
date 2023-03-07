import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { MaterialCard } from "components/organisms/material/MaterialCard";
import { Box, CircularProgress, Grid, Pagination } from "@mui/material";
import { useAllMaterials } from "hooks/useAllMaterials";
import { MaterialModal } from "components/organisms/material/MaterialModal";
import { useSelectMaterial } from "hooks/useSelectMaterial";
import { AuthContext } from "providers/AuthProvider";
import { Paginate } from "components/molecules/Paginate";
// import Paginate from "components/molecules/Pagenate";

// import ReactPaginate from "react-paginate";

type Props = {
  initialLikeCount: number;
};

export const MaterialList: FC<Props> = memo((props) => {
  const { initialLikeCount } = props;
  const { getMaterials, setMaterials, materials, loading } = useAllMaterials();
  const { currentUser } = useContext(AuthContext);
  const { onSelectMaterial, selectedMaterial } = useSelectMaterial();
  console.log(selectedMaterial);

  // いいね関係
  //いいねの数を管理
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  //モーダル関係
  const [open, setOpen] = useState(false);
  //教材をクリックした時の挙動 クリック時にmaterial.idが渡るようにidを付与
  const onClickMaterial = useCallback(
    (id: number) => {
      // 教材を特定する為にuseSelectMaterialのidとmaterialを与える
      onSelectMaterial({ id, materials });
      setOpen(true);
      console.log(id);
      console.log(materials);
    },
    [materials, onSelectMaterial]
  );
  const handleClose = useCallback(() => setOpen(false), []);

  // 教材データの取得
  useEffect(() => {
    getMaterials();
  }, [getMaterials]);

  // // // pagination関係
  // // Paginateで表示する現在のページ番号
  // const [page, setPage] = useState(1);

  // // 1ページに表示する数を指定
  // const itemsPerPage = 8;
  // // 一つのページに表示する教材
  // const [currentMaterials, setCurrentMaterials] = useState(null);
  // // 全ページ数
  // const [pageCount, setPageCount] = useState(0);

  // // ページの先頭の教材(何番目のアイテムから表示するか)
  // const [itemOffset, setItemOffset] = useState(0);
  // const endOffset = itemOffset + itemsPerPage;
  // useEffect(() => {
  //   // endOffset: 次のページの先頭の教材 ページ番号＋1ページに表示する教材の数(8)
  //   const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  //   // 一つのページに表示する教材
  //   setCurrentMaterials(materials.slice(itemOffset, endOffset));
  //   // 全ページ数 ＝ 全教材数から1ページに表示する教材(8)を割った値を繰り上げた値
  //   setPageCount(Math.ceil(materials.length / itemsPerPage));
  // }, [itemOffset, itemsPerPage, materials]);

  // // newOffset: offsetを変更し、表示開始するアイテムの番号を変更
  // const handlePageClick = (e: React.ChangeEvent, value) => {
  //   const newOffset = (e.selected * itemsPerPage) % materials.length;
  //   console.log(
  //     `User requested page number ${e.selected}, which is offset ${newOffset}`
  //   );
  //   setItemOffset(newOffset);
  //   setPage(currentMaterials);
  // };

  // 教材があれば表示して、なければないことを表示する
  const MaterialData = useCallback(() => {
    if (materials.length >= 1) {
      return (
        <>
          <Grid
            container
            display="flex"
            // flexDirection={"column"}
            alignItems="center"
            spacing={6}
            sx={{
              flexWrap: "wrap",
              // alignContent: "center",
              p: { xs: 3, md: 6 },
            }}
          >
            {materials.map((material) => (
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
          <Paginate
          // setMaterials={(m) => setMaterials(m)}
          />
          //{" "}
          {/* <Box
            //   sx={{
            //     justifyContent: "center",
            //     alignItems: "center",
            //     textAlign: "center",
            //   }}
            // > */}
          //{" "}
          {/* <Pagination
            //     // The total number of pages.
            //     count={pageCount}
            //     // The current page.
            //     page={page}
            //     onChange={(e) => handlePageClick}
            //     color="primary"
            //   /> */}
          // {/* </Box> */}
        </>
      );
    }
  }, [
    currentUser,
    handleClose,
    likeCount,
    materials,
    onClickMaterial,
    open,
    selectedMaterial,
    setMaterials,
  ]);

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
