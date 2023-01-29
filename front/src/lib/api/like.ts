import { client } from "lib/api/client";
import Cookies from "js-cookie";

// 新規作成
export const createLike = (id) => {
  return client.post(
    `/materials/${id}/likes`,
    {}, //createには、データを追加する箱が必要
    {
      // どのユーザーか判別するための情報
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    }
  );
};

// 削除
export const deleteLike = (id) => {
  return client.delete(`/likes/${id}`, {
    // どのユーザーか判別するための情報
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
