import { getCurrentUser } from "lib/api/auth";
import { useSnackbar } from "providers/SnackbarProvider";
import { useCallback, useEffect, useState } from "react";
import { User } from "types/api/user";

// 認証済みのユーザーがいるかどうかチェックするカスタムフック
export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const { showSnackbar } = useSnackbar();

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
  }, [showSnackbar]);

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
