import { client } from "lib/api/client";
import Cookies from "js-cookie";

// 指定したIDデータを取得 アカウント詳細ページ
export const getUserId = (id) => {
  return client.get(`/users/${id}`);
};

// 更新
export const updateUser = (id, params) => {
  return client.patch(`/users/${id}`, params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
