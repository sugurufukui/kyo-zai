import React, { FC, memo, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Box } from "@mui/system";

type Props = {
  materials: any;
  setCurrentMaterials: any;
};
// 使用していないコンポーネント

export const Pagenate: FC<Props> = memo((props) => {
  const { materials, setCurrentMaterials } = props;
  // 1ページに表示する数を指定
  const itemsPerPage = 8;

  // // 一つのページに表示する教材
  // const [currentMaterials, setCurrentMaterials] = useState(null);

  // 全ページ数 ＝ 全教材数から1ページに表示する教材(8)を割った値を繰り上げた値
  const [pageCount, setPageCount] = useState(0);

  // ページの先頭の教材(何番目のアイテムから表示するか)
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // 次のページの先頭の教材 ページ番号＋1ページに表示する教材の数(8)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // 一つのページに表示する教材
    setCurrentMaterials(materials.slice(itemOffset, endOffset));
    // 全ページ数 ＝ 全教材数から1ページに表示する教材(8)を割った値を繰り上げた値
    setPageCount(Math.ceil(materials.length / itemsPerPage));
  }, [
    itemOffset,
    itemsPerPage,
    //  materials
  ]);

  // クリック時のfunction
  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % materials.length;
    console.log(
      `User requested page number ${e.selected}, which is offset ${newOffset}`
    );
    // offsetを変更し、表示開始するアイテムの番号を変更
    setItemOffset(newOffset);
  };

  return (
    <Box sx={{ justifyContent: "center", textAlign: "center" }}>
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
    </Box>
  );
});
