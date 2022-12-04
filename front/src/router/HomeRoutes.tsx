import { Home } from "../components/pages/Home";
import { UserProfile } from "../components/pages/UserProfile";
import { Material } from "../components/pages/Material";
import { Page404 } from "../components/pages/Page404";

export const homeRoutes = [
  {
    path: "/",
    exact: true,
    children: <Home />,
  },
  {
    path: "/user_profile",
    exact: false,
    children: <UserProfile />,
  },
  {
    path: "/material",
    exact: false,
    children: <Material />,
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />,
  },
];
