import { useCallback, useState } from "react";

import { MaterialType } from "types/api/materialType";

type Props = {
  id: number;
  materials: Array<MaterialType>;
};

//選択した教材情報を特定するカスタムフック
export const useSelectMaterial = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | null>(null);
  const onSelectMaterial = useCallback((props: Props) => {
    const { id, materials } = props;
    const targetMaterial = materials.find((material) => material.id === id);
    setSelectedMaterial(targetMaterial!);
  }, []);
  return { onSelectMaterial, selectedMaterial };
};
