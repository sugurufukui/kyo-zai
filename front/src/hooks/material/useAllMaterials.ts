import { useCallback, useState } from "react";

import { getAllMaterial, getLikedMaterial, getMineMaterial } from "lib/api/material";
import { useSnackbar } from "providers/SnackbarProvider";
import { MaterialType } from "types/api/materialType";

export const useAllMaterials = () => {
  const [loading, setLoading] = useState(false);
  // 全ての教材のデータ
  const [materials, setMaterials] = useState<Array<MaterialType>>([]);
  // 自分が投稿した教材のデータ
  const [mineMaterials, setMineMaterials] = useState<Array<MaterialType>>([]);
  // 自分がいいねした教材のデータ
  const [likedMaterials, setLikedMaterials] = useState<Array<MaterialType>>([]);

  const { showSnackbar } = useSnackbar();

  // 教材の一覧を取得するAPI
  const getMaterials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllMaterial();
      console.log(res.data);
      setMaterials(res.data);
    } catch (e) {
      console.log(e);
      showSnackbar("教材情報の取得に失敗しました。", "error");
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  // 自分が投稿した教材の一覧を取得するAPI
  const getMineMaterials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMineMaterial();
      console.log(res.data);
      setMineMaterials(res.data);
    } catch (e) {
      console.log(e);
      showSnackbar("投稿した教材の取得に失敗しました。", "error");
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  // 自分がいいねした教材の一覧を取得するAPI
  const getLikedMaterials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getLikedMaterial();
      console.log(res.data);
      setLikedMaterials(res.data);
    } catch (e) {
      console.log(e);
      showSnackbar("いいねした教材の取得に失敗しました。", "error");
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  return {
    getMaterials,
    getMineMaterials,
    getLikedMaterials,
    materials,
    mineMaterials,
    likedMaterials,
    loading,
  };
};
