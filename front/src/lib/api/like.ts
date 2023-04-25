import Cookies from "js-cookie";
import { client } from "lib/api/client";

// Likeする
export const createLike = (id, params) => {
  return client.post(`/materials/${id}/likes`, params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// Likeを解除する
export const deleteLike = (id) => {
  return client.delete(`/materials/${id}/likes`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// すでにLikeしているか確認する
export const likedCheck = (id) => {
  return client.get(`/materials/${id}/likes`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
