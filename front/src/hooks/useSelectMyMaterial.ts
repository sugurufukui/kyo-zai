import { useCallback, useState } from "react";
import { MaterialType } from "types/api/materialType";

type Props = {
  id: number;
  myMaterials: Array<MaterialType>;
};

//選択した教材情報を特定するカスタムフック
export const useSelectMyMaterial = () => {
  const [selectedMyMaterial, setSelectedMyMaterial] =
    useState<MaterialType | null>(null);
  const onSelectMyMaterial = useCallback((props: Props) => {
    const { id, myMaterials } = props;
    const targetMaterial = myMaterials.find(
      (myMaterial) => myMaterial.id === id
    );
    setSelectedMyMaterial(targetMaterial!);
  }, []);
  return { onSelectMyMaterial, selectedMyMaterial };
};
