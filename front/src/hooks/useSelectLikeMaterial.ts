import { useCallback, useState } from "react";
import { MaterialType } from "types/api/materialType";

type Props = {
  id: number;
  likeMaterials: Array<MaterialType>;
};

//選択した教材情報を特定するカスタムフック
export const useSelectLikeMaterial = () => {
  // 一致した教材のデータを返す
  const [selectedLikeMaterial, setSelectedLikeMaterial] =
    useState<MaterialType | null>(null);
  // idから教材を取得する
  const onSelectLikeMaterial = useCallback((props: Props) => {
    const { id, likeMaterials } = props;
    // find： 条件に一致する最初の要素をかえす
    // materialのidとmaterialCardから渡されてきたidが一致するものをfindする
    const targetMaterial = likeMaterials.find(
      (likeMaterial) => likeMaterial.id === id
    );
    // 取得してきた情報をsetSelectMateriaのstateに入れる
    setSelectedLikeMaterial(targetMaterial!);
  }, []);
  return { onSelectLikeMaterial, selectedLikeMaterial };
};
