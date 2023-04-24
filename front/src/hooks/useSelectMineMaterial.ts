import { useCallback, useState } from "react";

import { MaterialType } from "types/api/materialType";

type Props = {
  id: number;
  MineMaterials: Array<MaterialType>;
};

//選択した教材情報を特定するカスタムフック
export const useSelectMineMaterial = () => {
  const [selectedMineMaterial, setSelectedMineMaterial] = useState<MaterialType | null>(null);
  const onSelectMineMaterial = useCallback((props: Props) => {
    const { id, MineMaterials } = props;
    const targetMaterial = MineMaterials.find((MineMaterial) => MineMaterial.id === id);
    setSelectedMineMaterial(targetMaterial!);
  }, []);
  return { onSelectMineMaterial, selectedMineMaterial };
};
