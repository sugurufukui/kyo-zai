import { SignUp } from "../../../types/api/signUp";
import { client } from "../client";

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUp) => {
  return client.post("auth", params);
};
