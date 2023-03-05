import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { MaterialCard } from "components/organisms/material/MaterialCard";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useAllMaterials } from "hooks/useAllMaterials";
import { MaterialModal } from "components/organisms/material/MaterialModal";
import { useSelectMaterial } from "hooks/useSelectMaterial";
import { AuthContext } from "providers/AuthProvider";

import ReactPaginate from "react-paginate";
import { Pagenate } from "components/molecules/Pagenate";

type Props = {
  initialLikeCount: number;
};

export const MaterialList: FC<Props> = memo((props) => {
  const { initialLikeCount } = props;
  const { getMaterials, materials, loading } = useAllMaterials();
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

  // pagination関係
  // 1ページに表示する数を指定
  // const itemsPerPage = 8;
  // // ページの先頭の教材(何番目のアイテムから表示するか)
  // const [itemsOffset, setItemsOffset] = useState(0);
  // // 次のページの先頭の教材 ページ番号＋1ページに表示する教材の数(6)
  // const endOffset = itemsOffset + itemsPerPage;
  // // 一つのページに表示する教材
  // const currentMaterials = materials?.slice(itemsOffset, endOffset);
  // // 全ページ数 ＝ 全教材数から1ページに表示する教材(8)を割った値を繰り上げた値
  // const pageCount = Math.ceil(materials?.length / itemsPerPage);
  // // const handlePageClick = (e: { selected: number }) => {
  // //   // クリックされた値から -1したもの
  // //   console.log(e.selected);
  // //   const newOffset = (e.selected * itemsPerPage) % materials.length; // クリックした部分のページ数が{selected: 2}のような形で返ってくる
  // //   setItemsOffset(newOffset); // offsetを変更し、表示開始するアイテムの番号を変更
  // // };
  // // クリック時のfunction
  // const handlePageClick = (data) => {
  //   let page_number = data["selected"]; // クリックした部分のページ数が{selected: 2}のような形で返ってくる
  //   setItemsOffset(page_number * itemsPerPage); // offsetを変更し、表示開始するアイテムの番号を変更
  // };

  // function PaginatedItems({ itemsPerPage }) {

  // // 1ページに表示する数を指定
  // const itemsPerPage = 8;

  // 一つのページに表示する教材
  const [currentMaterials, setCurrentMaterials] = useState(null);

  // // 全ページ数 ＝ 全教材数から1ページに表示する教材(8)を割った値を繰り上げた値
  // const [pageCount, setPageCount] = useState(0);

  // // ページの先頭の教材(何番目のアイテムから表示するか)
  // const [itemOffset, setItemOffset] = useState(0);

  // useEffect(() => {
  //   // 教材データの取得

  //   getMaterials();

  //   // 次のページの先頭の教材 ページ番号＋1ページに表示する教材の数(8)
  //   const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  //   // 一つのページに表示する教材
  //   setCurrentMaterials(materials.slice(itemOffset, endOffset));
  //   // 全ページ数 ＝ 全教材数から1ページに表示する教材(8)を割った値を繰り上げた値
  //   setPageCount(Math.ceil(materials.length / itemsPerPage));
  // }, [
  //   getMaterials,
  //   itemOffset,
  //   itemsPerPage,
  //   //  materials
  // ]);

  // // クリック時のfunction
  // const handlePageClick = (e) => {
  //   const newOffset = (e.selected * itemsPerPage) % materials.length;
  //   console.log(
  //     `User requested page number ${e.selected}, which is offset ${newOffset}`
  //   );
  //   // offsetを変更し、表示開始するアイテムの番号を変更
  //   setItemOffset(newOffset);
  // };

  // 教材があれば表示して、なければないことを表示する
  const MaterialData = useCallback(() => {
    if (materials.length >= 1) {
      return (
        <>
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
              // {currentMaterials.map((material) => (
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
          {/* <Pagenate
            materials={currentMaterials}
            setCurrentMaterials={setCurrentMaterials}
          /> */}
          {/* <Box sx={{ justifyContent: "center", textAlign: "center" }}>
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={handlePageClick} // クリック時のfunction
              previousLabel="<"
              nextLabel=">"
              breakLabel="..."
              marginPagesDisplayed={5} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
              pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
              // containerClassName={"pagination"} // ページネーションであるulに着くクラス名
              // subContainerClassName={"pages pagination"}
              // activeClassName={"active"} // アクティブなページのliに着くクラス名
              // previousClassName={"pagination__previous"} // 「<」のliに着けるクラス名
              // nextClassName={"pagination__next"} // 「>」のliに着けるクラス名
              disabledClassName={"pagination__disabled"} // 使用不可の「<,>」に着くクラス名
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
            />
          </Box> */}
        </>
      );
    }
  }, [
    materials,
    // currentMaterials,
    // currentUser,
    handleClose,
    // handlePageClick,
    // likeCount,
    // materials.length,
    // onClickMaterial,
    open,
    // pageCount,
    // selectedMaterial,
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
