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

// 削除(退会)
export const deleteUser = (id) => {
  return client.delete(`/users/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// アカウント削除確認メール送信
export const sendDeletionConfirmationEmail = async (userId: number) => {
  return client.post(
    `/users/${userId}/send_deletion_confirmation_email`,
    null,
    {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    }
  );
};
