import { FC, memo, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { deleteMaterial, getAllMaterial } from "lib/api/material";
import { useSnackbar } from "providers/SnackbarProvider";
import { MaterialCard } from "components/organisms/material/MaterialCard";

export const Material: FC = memo(() => {
  const { showSnackbar } = useSnackbar();
  const [materialData, setMaterialData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    getMaterialData();
  }, []);

  // 教材データの取得
  const getMaterialData = async () => {
    try {
      const res = await getAllMaterial();
      console.log(res.data);
      setMaterialData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  // 削除ボタン押下時
  const onClickDelete = async (item) => {
    console.log("click", item.id);
    try {
      const res = await deleteMaterial(item.id);
      // 削除後に残っているデータの再取得
      getMaterialData();
      // 削除の前に確認ボタンが欲しい「削除してもいいですか？」
      showSnackbar("削除しました", "success");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <button onClick={() => history.push("/materials/new")}>新規作成</button>
      <table>
        <thead>
          <tr>
            <th>名前</th>
            <th>説明</th>
          </tr>
        </thead>
        {materialData.map((item, id) => (
          <tbody key={id}>
            <tr>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <Link to={`materials/edit/${item.id}`}>編集する</Link>
              </td>
              <td>
                <Link to={`/materials/${item.id}`}>詳細へ</Link>
              </td>
              <td>
                <button onClick={() => onClickDelete(item)}>削除</button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <MaterialCard />
    </>
  );
});
