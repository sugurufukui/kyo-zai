import { client } from "lib/api/client";
import Cookies from "js-cookie";

//LIKEする
export const createLike = (id) => {
  return client.post(
    `/materials/${id}/likes`,
    {}, // createにはデータ追加の箱が必要
    {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    }
  );
};

// LIKEを解除する
export const deleteLike = (id) => {
  return client.delete(`/likes/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
