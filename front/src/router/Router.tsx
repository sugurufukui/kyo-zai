import { FC, memo, ReactElement } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CommonLayout } from "components/templates/CommonLayout";
import { SignUp } from "components/pages/SignUp";
import { SignIn } from "components/pages/SignIn";
import { Home } from "components/pages/Home";
import { AuthProvider } from "providers/AuthProvider";
import { useAuth } from "hooks/useAuth";
import { MaterialList } from "components/pages/MaterialList";
import { Detail } from "components/pages/material/Detail";
import { New } from "components/pages/material/New";
import { Edit } from "components/pages/material/Edit";
import { MyMaterial } from "components/pages/material/MyMaterial";
// import { Page404 } from "../components/pages/Page404";
import { MyLike } from "components/pages/material/MyLike";

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
              {/* いいねした教材 */}
              <Route exact path="/my_like" component={MyLike} />
              <Route exact path="/materials/new" component={New} />
              <Route exact path="/materials/:id" component={Detail} />
              {/* 自分の教材 */}
              <Route exact path="/my_materials" component={MyMaterial} />

              <Route exact path="/materials/edit/:id" component={Edit} />

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
