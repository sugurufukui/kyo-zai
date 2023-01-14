import { useAuth } from "hooks/useAuth";
import { createContext, memo, ReactNode } from "react";
import { User } from "types/api/user";

// グローバルで扱う変数・関数
type AuthContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = memo((props: Props) => {
  const { children } = props;
  const {
    loading,
    setLoading,
    isSignedIn,
    setIsSignedIn,
    currentUser,
    setCurrentUser,
  } = useAuth();

  return (
    <AuthContext.Provider
      // value以下がproviderで囲われた配下のコンポーネントでグローバルに参照できる
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
});
