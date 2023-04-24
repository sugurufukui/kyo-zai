import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { signOut } from "lib/api/auth";
import { AuthContext } from "providers/AuthProvider";
import { useSnackbar } from "providers/SnackbarProvider";

// アバターメニューの中の処理を実行するカスタムフック
export const useAvatarMenu = () => {
  const [avatarMenuOpened, setAvatarMenuOpened] = useState(undefined);
  const { showSnackbar } = useSnackbar();

  const { setIsSignedIn, currentUser } = useContext(AuthContext);
  const history = useHistory();

  const onClickAvatar = () => {
    setAvatarMenuOpened(true);
  };

  const onCloseAvatarMenu = () => {
    setAvatarMenuOpened(undefined);
  };

  const onClickSignOut = async () => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        history.push("/signin");

        showSnackbar("ログアウトしました", "success");
      } else {
        showSnackbar("ログアウトできませんでした", "error");
      }
    } catch (err) {
      showSnackbar("ログアウトできませんでした", "error");
    }
  };

  useEffect(() => {
    onCloseAvatarMenu();
  }, [currentUser]);

  return {
    avatarMenuOpened,
    onClickAvatar,
    onCloseAvatarMenu,
    onClickSignOut,
  };
};
