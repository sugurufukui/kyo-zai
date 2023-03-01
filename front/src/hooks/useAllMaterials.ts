import {
  getAllMaterial,
  getMyLikeMaterial,
  getMyMaterial,
} from "lib/api/material";
import { useCallback, useState } from "react";
import { MaterialType } from "types/api/materialType";
import { useSnackbar } from "providers/SnackbarProvider";
import { User } from "types/api/user";

export const useAllMaterials = () => {
  const [loading, setLoading] = useState(false);
  // 全ての教材のデータ
  const [materials, setMaterials] = useState<Array<MaterialType>>([]);
  // 自分が投稿した教材のデータ
  const [myMaterials, setMyMaterials] = useState<Array<MaterialType>>([]);
  // 自分がいいねした教材のデータ
  const [likeMaterials, setLikeMaterials] = useState<Array<MaterialType>>([]);

  const { showSnackbar } = useSnackbar();

  // 教材の一覧を取得するAPI
  const getMaterials = useCallback(async () => {
    // ローディングスタート(スピナー用意)
    setLoading(true);
    try {
      const res = await getAllMaterial();
      console.log(res.data);
      setMaterials(res.data);
    } catch (e) {
      console.log(e);
      showSnackbar("教材情報の取得に失敗しました。", "error");
    } finally {
      // ローディング停止use
      setLoading(false);
    }
  }, [showSnackbar]);

  // 自分が投稿した教材の一覧を取得するAPI
  const getMyMaterials = useCallback(async () => {
    // ローディングスタート(スピナー用意)
    setLoading(true);
    try {
      const res = await getMyMaterial();
      console.log(res.data);
      setMyMaterials(res.data);
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
    setLoading(true);
    try {
      const res = await getMyLikeMaterial();
      console.log(res.data);
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
    getMyMaterials,
    getLikeMaterials,
    materials,
    myMaterials,
    likeMaterials,
    loading,
  };
};
