import { useCallback, useState } from "react";
import { MaterialType } from "types/api/materialType";

type Props = {
  id: number;
  materials: Array<MaterialType>;
};

//選択した教材情報を特定するカスタムフック
export const useSelectMaterial = () => {
  // 一致した教材のデータを返す
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | null>(
    null
  );
  // idから教材を取得する
  const onSelectMaterial = useCallback((props: Props) => {
    const { id, materials } = props;
    // find： 条件に一致する最初の要素をかえす
    // materialのidとmaterialCardから渡されてきたidが一致するものをfindする
    const targetMaterial = materials.find((material) => material.id === id);
    // 取得してきた情報をsetSelectMateriaのstateに入れる
    setSelectedMaterial(targetMaterial!);
  }, []);
  return { onSelectMaterial, selectedMaterial };
};
