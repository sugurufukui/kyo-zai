import { client } from "lib/api/client";

// 教材一覧
export const getAllMaterial = () => {
  return client.get("/materials");
};

// 教材詳細
export const getDetailMaterial = (id) => {
  return client.get(`/materials/${id}`);
};

// 新規作成
export const createMaterial = (params) => {
  return client.post("/materials", params);
};

// 更新
export const updateMaterial = (id, params) => {
  return client.patch(`/materials/${id}`, params);
};

// 削除
export const deleteMaterial = (id) => {
  return client.delete(`/materials/${id}`);
};
