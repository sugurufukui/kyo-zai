// import { FC, memo } from "react";
// import { Route, Switch } from "react-router-dom";
// import { Login } from "../components/pages/Login";
// import { homeRoutes } from "./HomeRoutes";
// import { Page404 } from "../components/pages/Page404";
// import { HeaderLayout } from "../components/templates/HeaderLayout";

import { FC, memo, createContext, useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { User } from "types/api/user";
import { CommonLayout } from "components/templates/CommonLayout";
import { SignUp } from "components/pages/SignUp";
import { SignIn } from "components/pages/SignIn";
import { getCurrentUser } from "lib/api/auth/getCurrentUser";
import { Home } from "components/pages/Home";

// グローバルで扱う変数・関数
export const AuthContext = createContext(
  {} as {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  }
);

export const Router: FC = memo(() => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      console.log(res);

      if (res?.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.currentUser);
      } else {
        alert("ユーザーがいません");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        return <Redirect to="/signin" />;
      }
    } else {
      return <></>;
    }
  };

  return (
    // {
    //AuthProviderとしてproviderフォルダに切り分ける
    // }
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
      }}
    >
      <CommonLayout>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Private>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Private>
        </Switch>
      </CommonLayout>
    </AuthContext.Provider>
  );
});
// export const Router: FC = memo(() => {
//   return (
//     <HeaderLayout>
//       <Switch>
//         <Route exact path="/">
//           <Login />
//         </Route>
//         <Route
//           path="/home"
//           render={({ match: { url } }) => (
//             <Switch>
//               {homeRoutes.map((route) => (
//                 <Route
//                   key={route.path}
//                   exact={route.exact}
//                   path={`${url}${route.path}`}
//                 >
//                   {route.children}
//                 </Route>
//               ))}
//             </Switch>
//           )}
//         />
//         <Route path="*">
//           <Page404 />
//         </Route>
//       </Switch>
//     </HeaderLayout>
//   );
// });
