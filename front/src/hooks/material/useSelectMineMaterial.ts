import { useCallback, useState } from "react";

import { MaterialType } from "types/api/materialType";

type Props = {
  id: number;
  mineMaterials: Array<MaterialType>;
};

//選択した教材情報を特定するカスタムフック
export const useSelectMineMaterial = () => {
  const [selectedMineMaterial, setSelectedMineMaterial] = useState<MaterialType | null>(null);
  const onSelectMineMaterial = useCallback((props: Props) => {
    const { id, mineMaterials } = props;
    const targetMaterial = mineMaterials.find((MineMaterial) => MineMaterial.id === id);
    setSelectedMineMaterial(targetMaterial!);
  }, []);
  return { onSelectMineMaterial, selectedMineMaterial };
};
