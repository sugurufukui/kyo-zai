import { client } from "./client";
// 動作確認用
export const test = () => {
  return client.get("/test");
};
