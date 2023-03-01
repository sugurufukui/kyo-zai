import { useCallback, useState } from "react";
import { MaterialType } from "types/api/materialType";

type Props = {
  id: number;
  myMaterials: Array<MaterialType>;
};

//選択した教材情報を特定するカスタムフック
export const useSelectMyMaterial = () => {
  // 一致した教材のデータを返す
  const [selectedMyMaterial, setSelectedMyMaterial] =
    useState<MaterialType | null>(null);
  // idから教材を取得する
  const onSelectMyMaterial = useCallback((props: Props) => {
    const { id, myMaterials } = props;
    // find： 条件に一致する最初の要素をかえす
    // materialのidとmaterialCardから渡されてきたidが一致するものをfindする
    const targetMaterial = myMaterials.find(
      (myMaterial) => myMaterial.id === id
    );
    // 取得してきた情報をsetSelectMateriaのstateに入れる
    setSelectedMyMaterial(targetMaterial!);
  }, []);
  return { onSelectMyMaterial, selectedMyMaterial };
};
