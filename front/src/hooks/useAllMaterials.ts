import { getAllMaterial, getMyLikeMaterial } from "lib/api/material";
import { useCallback, useState } from "react";
import { MaterialType } from "types/api/materialType";
import { useSnackbar } from "providers/SnackbarProvider";

export const useAllMaterials = () => {
  const [loading, setLoading] = useState(false);
  // 全ての教材のデータ
  const [materials, setMaterials] = useState<Array<MaterialType>>([]);
  // 自分がいいねした教材のデータ
  const [likeMaterials, setLikeMaterials] = useState<Array<MaterialType>>([]);

  const { showSnackbar } = useSnackbar();

  // 教材の一覧を取得するAPI
  const getMaterials = useCallback(async () => {
    // ローディングスタート(スピナー用意)
    // setLoading(true);
    try {
      const res = await getAllMaterial();
      console.log(res.data);
      setMaterials(res.data);
    } catch (e) {
      console.log(e);
      showSnackbar("教材情報の取得に失敗しました。", "error");
    } finally {
      // ローディング停止
      setLoading(false);
    }
  }, [showSnackbar]);

  // 自分がいいねした教材の一覧を取得するAPI
  const getLikeMaterials = useCallback(async () => {
    // ローディングスタート(スピナー用意)
    // setLoading(true);
    try {
      const res = await getMyLikeMaterial();
      //dataの値がnullとなっている
      console.log(res);
      setLikeMaterials(res.data);
    } catch (e) {
      console.log(e);
      showSnackbar("教材情報の取得に失敗しました。", "error");
    } finally {
      // ローディング停止
      setLoading(false);
    }
  }, [showSnackbar]);

  return {
    getMaterials,
    getLikeMaterials,
    materials,
    likeMaterials,
    loading,
  };
};
