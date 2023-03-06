import React, { FC, useState } from "react";
import ReactPaginate from "react-paginate";
import { MaterialType } from "types/api/materialType";

// import "styles/App.scss";

type Props = {
  materials: MaterialType[];
};
// 使用していないコンポーネント
export const Paginate: FC<Props> = (props) => {
  const { materials } = props;

  // 1ページに表示する数を指定
  const itemsPerPage = 6;

  // ページの先頭の教材(何番目のアイテムから表示するか)
  const [itemsOffset, setItemsOffset] = useState(0);

  // 次のページの先頭の教材 ページ番号＋1ページに表示する教材の数(6)
  const endOffset = itemsOffset + itemsPerPage;
  // 一つのページに表示する教材
  const currentMaterials = materials?.slice(itemsOffset, endOffset);

  // 全ページ数 ＝ 全教材数から1ページに表示する教材(6)を割った値を繰り上げた値
  const pageCount = Math.ceil(materials?.length / itemsPerPage);

  const handlePageClick = (e: { selected: number }) => {
    // クリックされた値から -1したもの
    console.log(e.selected);

    const newOffset = (e.selected * itemsPerPage) % materials.length; // クリックした部分のページ数が{selected: 2}のような形で返ってくる
    setItemsOffset(newOffset); // offsetを変更し、表示開始するアイテムの番号を変更
  };

  return (
    <>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick} // クリック時のfunction
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        marginPagesDisplayed={5} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
        pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
        containerClassName={"pagination"} // ページネーションであるulに着くクラス名
        // subContainerClassName={"pages pagination"}
        activeClassName={"active"} // アクティブなページのliに着くクラス名
        previousClassName={"pagination__previous"} // 「<」のliに着けるクラス名
        nextClassName={"pagination__next"} // 「>」のliに着けるクラス名
        disabledClassName={"pagination__disabled"} // 使用不可の「<,>」に着くクラス名
      />
    </>
  );
};
