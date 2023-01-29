import {
  createContext,
  memo,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { createLike, deleteLike } from "lib/api/like";
import { User } from "types/api/user";
import { AuthContext } from "providers/AuthProvider";
import { getDetailMaterial } from "lib/api/material";
import { MaterialType } from "types/api/materialType";
import { useParams } from "react-router-dom";
import { useAllMaterials } from "../hooks/useAllMaterials";

// グローバルで扱う変数・関数
type LikeContextType = {};

type Props = {
  children: ReactNode;
};
export const LikeContext = createContext<LikeContextType>(
  {} as LikeContextType
);

export const LikeProvider = memo((props: Props) => {
  const { children } = props;
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState<MaterialType>();
  const { getMaterials, materials, loading } = useAllMaterials();
  const query = useParams();

  // (以下、materialDetailxtsxから引用した)
  // likeやcommentのコンポーネントでも使用するため、hook化する？
  //一覧画面で選択された教材のidに紐づいたデータを取得
  const getDetail = async (query) => {
    try {
      const res = await getDetailMaterial(query.id);
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDetail(query);
  }, [query]);

  // useLikeとしてカスタムフック化する？
  //いいね追加時の挙動
  const handleCreateLike = async (material) => {
    try {
      const res = await createLike(material.id);
      console.log(res.data);
      getDetail(query); //教材の詳細データを取得
    } catch (e) {
      console.log(e);
    }
  };

  //いいね解除時の挙動
  const handleDeleteLike = async (material) => {
    try {
      const res = await deleteLike(material.id);
      console.log(res.data);
      getDetail(query); //教材の詳細データを取得
    } catch (e) {
      console.log(e);
    }
  };

  // グローバルに参照できる値をvalueに入れる
  return (
    <LikeContext.Provider value={}>
      {children}
      {materials.likes.find((like) => like.userId === currentUser.id)} ? (
      {/* likesの配列の中にcurrentUser.idがあればlikeを解除、なければ作成 */}
      <IconButton
        onClick={() => handleDeleteLike(materials)}
        aria-label="add to favorites"
      >
        <FavoriteBorderIcon />
        {materials.likes.length}
      </IconButton>
      ) :(
      <IconButton
        onClick={() => handleCreateLike(materials)}
        aria-label="add to favorites"
      >
        <FavoriteBorderIcon />
        {materials.likes.length}
      </IconButton>
      )
    </LikeContext.Provider>
  );
});
