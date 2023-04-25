import axios from "axios";
import Cookies from "js-cookie";
import applyCaseMiddleware from "axios-case-converter";

const options = {
  ignoreHeaders: true,
};

const baseClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// リクエスト時に認証情報をヘッダーに設定する
baseClient.interceptors.request.use((config) => {
  config.headers["access-token"] = Cookies.get("_access_token");
  config.headers["client"] = Cookies.get("_client");
  config.headers["uid"] = Cookies.get("_uid");

  return config;
});

// レスポンス時に認証情報をCookieに保存する
baseClient.interceptors.response.use(
  (response) => {
    const accessToken = response.headers["access-token"];
    const client = response.headers["client"];
    const uid = response.headers["uid"];

    if (accessToken && client && uid) {
      Cookies.set("_access_token", accessToken);
      Cookies.set("_client", client);
      Cookies.set("_uid", uid);
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const client = applyCaseMiddleware(baseClient, options);
