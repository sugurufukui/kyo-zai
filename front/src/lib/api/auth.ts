//認証API関連の関数
import Cookies from "js-cookie";
import { client } from "lib/api/client";

import { ResetPasswordParams } from "types/api/ResetPasswordParams";
import { SignInParams } from "types/api/SignInParams";
import { SignUpParams } from "types/api/SignUpParams";

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

///ログインユーザーを取得
export const getCurrentUser = () => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid"))
    return Promise.reject("No authentication info");

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

// パスワード再設定用のメールを送信
export const sendResetPasswordInstructions = (params: { email: string }) => {
  return client.post("/auth/password", params, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

// パスワードリセット
export const resetPassword = (params: ResetPasswordParams) => {
  return client.put("/auth/password", params, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
