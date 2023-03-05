import { getCurrentUser } from "lib/api/auth";
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

  const handleGetCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCurrentUser();
      if (res?.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data.data);
      } else {
        console.log("未ログイン状態");
      }
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  }, []);

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
