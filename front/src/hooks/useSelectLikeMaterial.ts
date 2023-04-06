import { useCallback, useState } from "react";
import { MaterialType } from "types/api/materialType";

type Props = {
  id: number;
  likeMaterials: Array<MaterialType>;
};

//選択した教材情報を特定するカスタムフック
export const useSelectLikeMaterial = () => {
  const [selectedLikeMaterial, setSelectedLikeMaterial] =
    useState<MaterialType | null>(null);
  const onSelectLikeMaterial = useCallback((props: Props) => {
    const { id, likeMaterials } = props;
    const targetMaterial = likeMaterials.find(
      (likeMaterial) => likeMaterial.id === id
    );
    setSelectedLikeMaterial(targetMaterial!);
  }, []);
  return { onSelectLikeMaterial, selectedLikeMaterial };
};
