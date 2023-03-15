import { FC, memo, ReactElement, ReactNode } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CommonLayout } from "components/templates/CommonLayout";
import { SignUp } from "components/pages/SignUp";
import { SignIn } from "components/pages/SignIn";
import { Home } from "components/pages/Home";
import { AuthProvider } from "providers/AuthProvider";
import { useAuth } from "hooks/useAuth";
import { List } from "components/pages/material/List";
import { Detail } from "components/pages/material/Detail";
import { New } from "components/pages/material/New";
import { Edit } from "components/pages/material/Edit";
import { MyMaterial } from "components/pages/material/MyMaterial";
import { MyLike } from "components/pages/material/MyLike";
import { Account } from "components/pages/Account";
import { AccountEdit } from "components/pages/AccountEdit";
import { Page404 } from "components/pages/Page404";

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
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Private>
            <Switch>
              <Route exact path="/materials" component={List} />
              <Route exact path="/my_like" component={MyLike} />
              <Route exact path="/materials/new" component={New} />
              <Route exact path="/materials/:id" component={Detail} />
              <Route exact path="/my_materials" component={MyMaterial} />
              <Route exact path="/materials/edit/:id" component={Edit} />
              <Route exact path="/user/:id" component={Account} />
              <Route exact path="/user/edit/:id" component={AccountEdit} />
              {/* 　これがあると①指定されたURL以外にアクセスすると、意図通り404ページが返される②ログイン時、非ログイン時、ともに、“/”(HOMEページ)の下部に404ページが表示される */}
              {/* <Route>
                <Page404 />
              </Route> */}

              {/* これがあると、以前は意図通りに404ページが表示されたが現在はされなくなった。 */}
              {/* <Route path="* ">
                <Page404 />
              </Route> */}
              <Route exact path="/notfound404">
                <Page404 />
              </Route>
            </Switch>
          </Private>
          {/*  これがあると全ページに404が出力される */}
          {/* <Route>
            <Page404 />
          </Route> */}
          {/* これがあると、以前は意図通りに404ページが表示されたが現在はされなくなった。 */}
          {/* <Route path="* ">
            <Page404 />
          </Route> */}
        </CommonLayout>
      </AuthProvider>
    </Switch>
  );
});
