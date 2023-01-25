import { getAllMaterial } from "lib/api/material";
import { useCallback, useState } from "react";
import { MaterialType } from "types/api/materialType";
import { useSnackbar } from "providers/SnackbarProvider";

export const useAllMaterials = () => {
  const [loading, setLoading] = useState(false);
  const [materials, setMaterials] = useState<Array<MaterialType>>([]);
  const { showSnackbar } = useSnackbar();
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
  return { getMaterials, materials, loading };
};
