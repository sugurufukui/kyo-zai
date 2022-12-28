import { SignInParams } from "types/api/SignInParams";
import { client } from "lib/api/client";

//サインイン(ログイン)
export const signIn = (params: SignInParams) => {
  return client.post("/auth/sign_in", params);
};
