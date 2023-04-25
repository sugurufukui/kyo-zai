import { createContext, memo, ReactNode } from "react";

import { useAuth } from "hooks/user/useAuth";
import { User } from "types/api/user";

// グローバルで扱う変数・関数
type AuthContextType = {
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = memo((props: Props) => {
  const { children } = props;
  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useAuth();

  return (
    <AuthContext.Provider
      value={{
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
