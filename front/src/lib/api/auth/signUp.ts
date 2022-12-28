import { client } from "lib/api/client";
import { SignUpParams } from "types/api/SignUpParams";

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return client.post("/auth", params);
};
