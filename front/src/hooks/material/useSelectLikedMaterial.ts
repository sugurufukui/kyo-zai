import { useCallback, useState } from "react";

import { MaterialType } from "types/api/materialType";

type Props = {
  id: number;
  likedMaterials: Array<MaterialType>;
};

//選択した教材情報を特定するカスタムフック
export const useSelectLikedMaterial = () => {
  const [selectedLikedMaterial, setSelectedLikedMaterial] = useState<MaterialType | null>(null);
  const onSelectLikedMaterial = useCallback((props: Props) => {
    const { id, likedMaterials } = props;
    const targetMaterial = likedMaterials.find((likedMaterial) => likedMaterial.id === id);
    setSelectedLikedMaterial(targetMaterial!);
  }, []);
  return { onSelectLikedMaterial, selectedLikedMaterial };
};
