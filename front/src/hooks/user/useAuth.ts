import { useCallback, useEffect, useState } from "react";

import { getCurrentUser } from "lib/api/auth";
import { User } from "types/api/user";

// 認証済みのユーザーがいるかどうかチェックするカスタムフック
export const useAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const handleGetCurrentUser = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    handleGetCurrentUser();
  }, [handleGetCurrentUser]);

  return {
    handleGetCurrentUser,
    isSignedIn,
    setIsSignedIn,
    currentUser,
    setCurrentUser,
  };
};
