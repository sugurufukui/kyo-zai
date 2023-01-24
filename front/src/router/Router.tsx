import { FC, memo, ReactElement } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CommonLayout } from "components/templates/CommonLayout";
import { SignUp } from "components/pages/SignUp";
import { SignIn } from "components/pages/SignIn";
import { Home } from "components/pages/Home";
import { AuthProvider } from "providers/AuthProvider";
import { useAuth } from "hooks/useAuth";
import { MaterialList } from "components/pages/MaterialList";
import { MaterialDetail } from "components/pages/MaterialDetail";
import { MaterialNew } from "components/pages/MaterialNew";
import { MaterialEdit } from "components/pages/MaterialEdit";
import { UserMaterial } from "components/pages/UserMaterial";
// import { homeRoutes } from "./HomeRoutes";
// import { Page404 } from "../components/pages/Page404";

export const Router: FC = memo(() => {
  const { loading, isSignedIn } = useAuth();

  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す

  type Props = {
    children: ReactElement;
  };
  const Private: FC<Props> = (props) => {
    const { children } = props;
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
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Private>
            <Switch>
              <Route exact path="/materials" component={MaterialList} />
              <Route exact path="/materials/new" component={MaterialNew} />
              <Route exact path="/materials/:id" component={MaterialDetail} />
              <Route exact path="/user/materials/" component={UserMaterial} />
              <Route
                exact
                path="/materials/edit/:id/"
                component={MaterialEdit}
              />

              {/* 検索ページ */}
              {/* 投稿ページ */}
              {/* マイページ */}
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
