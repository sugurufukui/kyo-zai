import { FC, memo } from "react";
import { Link } from "react-router-dom";

import { MaterialType } from "types/api/materialType";
import { User } from "types/api/user";

type Props = {
  materials: Array<MaterialType>;
  currentUser: User;
  onClickDelete: () => void;
};

// 編集・削除それぞれ切り分けてコンポーネントを作る？
export const ListTable: FC<Props> = memo((props) => {
  const { materials, currentUser, onClickDelete } = props;
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {materials.map((material) => (
          <tr key={material.id}>
            {/* ログインユーザーのIDと教材のユーザーIDが一致している場合に編集・削除ボタンを表示 */}
            {currentUser.id === material.userId ? (
              <td>
                <Link to={`/materials/edit/${material.id}`}>編集</Link>
              </td>
            ) : (
              <td>違うユーザーなので編集ボタンでない</td>
            )}
            <td>
              <Link to={`/materials/${material.id}`}>詳細へ</Link>
            </td>
            {currentUser.id === material.userId ? (
              <td>
                <button onClick={() => onClickDelete()}>削除</button>
              </td>
            ) : (
              <td>違うユーザーなので削除ボタンでない</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
});
