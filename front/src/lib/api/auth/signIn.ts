import { SignIn } from "../../../types/api/signIn";
import { client } from "../client";

//サインイン(ログイン)
export const signIn = (params: SignIn) => {
  return client.post("auth/sign_in", params);
};
