import Cookies from "js-cookie";
import { client } from "lib/api/client";

// 教材一覧
export const getAllMaterial = () => {
  return client.get("/materials");
};

// 自分が投稿した教材一覧
export const getMineMaterial = () => {
  return client.get("/mine_materials", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// 自分がいいねした教材一覧
export const getLikedMaterial = () => {
  return client.get("/liked_materials", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// 教材詳細
export const getDetailMaterial = (id) => {
  return client.get(`/materials/${id}`);
};

// 新規作成
export const createMaterial = (params: FormData) => {
  return client.post("/materials", params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// 更新
export const updateMaterial = (id, params) => {
  return client.patch(`/materials/${id}`, params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// 削除
export const deleteMaterial = (id) => {
  return client.delete(`/materials/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
