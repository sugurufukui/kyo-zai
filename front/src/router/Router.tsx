import { FC, memo, ReactElement } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { Account } from "components/pages/Account";
import { AccountEdit } from "components/pages/AccountEdit";
import { ExpiredEmailLink } from "components/pages/ExpiredEmailLink";
import { ForgotPassword } from "components/pages/ForgotPassword";
import { Home } from "components/pages/Home";
import { Detail } from "components/pages/material/Detail";
import { Edit } from "components/pages/material/Edit";
import { List } from "components/pages/material/List";
import { Liked } from "components/pages/material/Liked";
import { Mine } from "components/pages/material/Mine";
import { New } from "components/pages/material/New";
import { Page404 } from "components/pages/Page404";
import { ResetPassword } from "components/pages/ResetPassword";
import { ResetPasswordEmail } from "components/pages/ResetPasswordEmail";
import { SignIn } from "components/pages/SignIn";
import { SignUp } from "components/pages/SignUp";
import { WelcomeEmail } from "components/pages/WelcomeEmail";
import { CommonLayout } from "components/templates/CommonLayout";
import { useAuth } from "hooks/useAuth";
import { AuthProvider } from "providers/AuthProvider";

export const Router: FC = memo(() => {
  const { isSignedIn } = useAuth();

  // 未認証の場合「/signin」ページへ
  type Props = {
    children: ReactElement;
  };

  const Private: FC<Props> = (props) => {
    const { children } = props;
    if (isSignedIn) {
      return children;
    } else {
      return <Redirect to="/signin" />;
    }
  };

  return (
    <Switch>
      <AuthProvider>
        <CommonLayout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/welcome" component={WelcomeEmail} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/forgot_password" component={ForgotPassword} />
            <Route exact path="/send_password_email" component={ResetPasswordEmail} />
            <Route exact path="/reset_password/:token" component={ResetPassword} />
            <Route exact path="/expired_email_link" component={ExpiredEmailLink} />
            <Private>
              <Switch>
                <Route exact path="/materials" component={List} />
                <Route exact path="/liked_materials" component={Liked} />
                <Route exact path="/materials/new" component={New} />
                <Route exact path="/materials/:id" component={Detail} />
                <Route exact path="/mine_materials" component={Mine} />
                <Route exact path="/materials/edit/:id" component={Edit} />
                <Route exact path="/user/:id" component={Account} />
                <Route exact path="/user/edit/:id" component={AccountEdit} />
                <Route>
                  <Page404 />
                </Route>
                <Route exact path="/notfound404">
                  <Page404 />
                </Route>
              </Switch>
            </Private>
            <Route>
              <Page404 />
            </Route>
          </Switch>
        </CommonLayout>
      </AuthProvider>
    </Switch>
  );
});
