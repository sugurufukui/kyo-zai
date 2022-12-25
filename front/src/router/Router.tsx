import { FC, memo } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CommonLayout } from "components/templates/CommonLayout";
import { SignUp } from "components/pages/SignUp";
import { SignIn } from "components/pages/SignIn";
import { Home } from "components/pages/Home";
import { AuthProvider } from "providers/AuthProvider";
import { useAuth } from "hooks/useAuth";
// import { homeRoutes } from "./HomeRoutes";
// import { Page404 } from "../components/pages/Page404";

export const Router: FC = memo(() => {
  const { loading, isSignedIn } = useAuth();

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
    <Switch>
      <AuthProvider>
        <CommonLayout>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Private>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Private>
        </CommonLayout>
      </AuthProvider>
    </Switch>
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
