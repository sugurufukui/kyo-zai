import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { MaterialCard } from "components/organisms/material/MaterialCard";
import { Box, Grid } from "@mui/material";
import { useAllMaterials } from "hooks/useAllMaterials";
import { MaterialModal } from "components/organisms/material/MaterialModal";
import { useSelectMaterial } from "hooks/useSelectMaterial";
import { AuthContext } from "providers/AuthProvider";

import { createLike, deleteLike, likedCheck } from "lib/api/like";
import _ from "lodash";

import ReactPaginate from "react-paginate";

type Props = {
  initialLikeCount: number;
  materialId: number | null;
};

export const MaterialList: FC<Props> = memo((props) => {
  const { initialLikeCount, materialId } = props;
  // const { showSnackbar } = useSnackbar();
  const { getMaterials, materials, loading } = useAllMaterials();
  const { currentUser } = useContext(AuthContext);
  const { onSelectMaterial, selectedMaterial } = useSelectMaterial();
  console.log(selectedMaterial);

  // いいね関係
  //いいねの数を管理
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  //いいねの🤍の色を管理
  const [liked, setLiked] = useState(false);
  // 誰がどの教材にいいねしたのか
  const [likeData, setLikeData] = useState({
    userId: 0,
    materialId: 0,
  });

  // いいね情報を確認
  const handleGetLike = useCallback(async () => {
    setLikeData({
      userId: currentUser.id,
      materialId: materialId,
    });
    try {
      // いいねボタンを押したらいいねしているかを確認。
      const res = await likedCheck(materialId);
      setLikeCount(res.data.likeCount);
      if (res.data.like) {
        setLiked(true);
      }
    } catch (e) {
      console.log(e);
    }
  }, [currentUser.id, materialId]);

  //いいね追加時
  const clickToLike = _.debounce(async () => {
    //現在のlikeの状態と逆の状態をchangeに代入
    //setLikedの更新。画面が更新される。changeを代入
    const change = true;
    setLiked(change);

    //いいねの数を＋1する
    try {
      const res = await createLike(materialId, likeData);
      setLikeCount(likeCount + 1);
      console.log(likeCount + 1);
    } catch (e) {
      console.log(e);
    }
  }, 500);

  //いいね解除時
  const clickToUnLike = _.debounce(async () => {
    //現在のlikeの状態と逆の状態をchangeに代入
    //setLikesの更新。画面が更新される。changeを代入
    const change = false;
    setLiked(change);

    //いいねの数を-1にする
    try {
      const res = await deleteLike(materialId);
      console.log(res.data);
      setLikeCount(likeCount - 1);
      console.log(likeCount - 1);
    } catch (e) {
      console.log(e);
    }
  }, 500);

  //モーダル関係
  // 作業しやすいように一旦常時表示しておく =>(true)
  const [open, setOpen] = useState(false);
  //教材をクリックした時の挙動 クリック時にmaterial.idが渡るようにidを付与
  const onClickMaterial = useCallback(
    (id: number) => {
      // 教材を特定する為にuseSelectMaterialのidとmaterialを与える
      onSelectMaterial({ id, materials });
      setOpen(true);
    },
    [materials, onSelectMaterial, selectedMaterial, likeCount]
  );
  const handleClose = () => setOpen(false);

  // 教材データの取得
  useEffect(() => {
    getMaterials();
  }, [getMaterials]);

  // pagination関係

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
      {/* 編集は作成者のみができるようにする。使用箇所はモーダル内と詳細画面
      レスポンシブデザインにしたい */}
      <Grid
        container
        spacing={6}
        sx={{
          flexWrap: "wrap",
          // alignContent: "center",
          p: { xs: 3, md: 6 },
        }}
      >
        {currentMaterials.map((material) => (
          <Grid
            key={material.id}
            sx={{
              m: "auto",
              p: "4",
            }}
          >
            {material.image?.url ? (
              <MaterialCard
                id={material.id}
                // imageUrl="https://source.unsplash.com/random"
                imageUrl={material.image.url}
                materialName={material.name}
                onClick={onClickMaterial}
                materialId={material.id}
                currentUser={currentUser}
                initialLikeCount={likeCount}
              />
            ) : null}
          </Grid>
        ))}
      </Grid>
      <MaterialModal
        open={open}
        onClose={handleClose}
        material={selectedMaterial}
        // Uncaught TypeError: Cannot read properties of null (reading 'id')
        // => useSelectMaterialでnullの可能性も示しているので"?"追加
        materialId={selectedMaterial?.id}
        currentUser={currentUser}
        imageUrl={selectedMaterial?.image.url}
        initialLikeCount={likeCount}
      />
      <Box sx={{ justifyContent: "center", textAlign: "center" }}>
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageClick} // クリック時のfunction
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
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
    </>
  );
});
