import Cookies from "js-cookie";
import { client } from "lib/api/client";

export const getUserMaterials = (id) => {
  return client.get(`/users/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
