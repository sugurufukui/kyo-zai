import { getCurrentUser } from "lib/api/auth";
import { useSnackbar } from "providers/SnackbarProvider";
import { useCallback, useEffect, useState } from "react";
import { User } from "types/api/user";

// 認証済みのユーザーがいるかどうかチェックするカスタムフック
//useStateの内容を外部で使用できるようにフック化
// 確認できた場合はそのユーザーの情報を取得
// (consoleはログインする前に走る)
// 4回コンソールが走る問題=>useCallback使っても解決せず。axios使うことで解決できる？
export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const { showSnackbar } = useSnackbar();

  const handleGetCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCurrentUser();
      console.log(res);

      if (res?.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data);
      } else {
        showSnackbar("ユーザーが見つかりませんでした。", "error");
        console.log(res?.data);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }, [showSnackbar]);

  //サインイン時にhandleGetCurrentUserしてユーザーの情報をもたせた方がいい？
  useEffect(() => {
    handleGetCurrentUser();
  }, [handleGetCurrentUser]);

  return {
    handleGetCurrentUser,
    loading,
    setLoading,
    isSignedIn,
    setIsSignedIn,
    currentUser,
    setCurrentUser,
  };
};
