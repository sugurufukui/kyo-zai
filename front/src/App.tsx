import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import theme from "./theme/theme";
// import { Router } from "./router/Router";
import React, {
  createContext,
  FC,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { User } from "./types/api/user";
import { getCurrentUser } from "./lib/api/auth/getCurrentUser";
import { HeaderLayout } from "./components/templates/HeaderLayout";
import { homeRoutes } from "./router/HomeRoutes";
import { Page404 } from "./components/pages/Page404";
import { Login } from "./components/pages/Login";

//グローバルで扱う変数・関数
export const AuthContext = createContext(
  {} as {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  }
);

export default function App() {
  //セット関数を配置
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザー情報を取得
  // axiosで書き換えたい
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLoggedIn === true) {
        setIsLoggedIn(true);
        setCurrentUser(res?.data.data);

        console.log(res?.data.data);
      } else {
        console.log("ユーザーがいません");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  //ユーザーが認証済みがどうかでルーティングを決定
  //未認証だった場合はログインページ（/login）に戻す
  type Props = {
    children: ReactElement;
  };
  const Private: FC<Props> = (props) => {
    const { children } = props;
    if (!loading) {
      if (isLoggedIn) {
        return children;
      } else {
        return <Redirect to="/" />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        {/* routerフォルダとしに切り分けたい */}
        {/* AuthProviderとしてproviderフォルダに切り分けたい */}
        <AuthContext.Provider
          value={{
            loading,
            setLoading,
            isLoggedIn,
            setIsLoggedIn,
            currentUser,
            setCurrentUser,
          }}
        >
          <HeaderLayout>
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Private>
                <Route
                  path="/home"
                  render={({ match: { url } }) => (
                    <Switch>
                      {homeRoutes.map((route) => (
                        <Route
                          key={route.path}
                          exact={route.exact}
                          path={`${url}${route.path}`}
                        >
                          {route.children}
                        </Route>
                      ))}
                    </Switch>
                  )}
                />
              </Private>
              <Route path="*">
                <Page404 />
              </Route>
            </Switch>
          </HeaderLayout>
        </AuthContext.Provider>
      </BrowserRouter>
    </ChakraProvider>
  );
}
