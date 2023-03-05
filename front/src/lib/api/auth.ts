//認証API関連の関数
import { client } from "lib/api/client";
import Cookies from "js-cookie";

import { SignUpParams } from "types/api/SignUpParams";
import { SignInParams } from "types/api/SignInParams";

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return client.post("/auth", params);
};

//サインイン(ログイン)
export const signIn = (params: SignInParams) => {
  return client.post("/auth/sign_in", params);
};

//サインアウト（ログアウト）
export const signOut = () => {
  return client.delete("/auth/sign_out", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

//ログインユーザーを取得
export const getCurrentUser = () => {
  if (
    !Cookies.get("_access_token") ||
    !Cookies.get("_client") ||
    !Cookies.get("_uid")
  )
    return;
  return client.get("/auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// ゲストログイン
export const getGuestUserSignIn = () => {
  return client.post("/auth/guest_sign_in", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
