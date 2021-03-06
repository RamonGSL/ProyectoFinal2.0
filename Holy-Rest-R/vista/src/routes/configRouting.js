import Home from "../views/Home/Home";
import Error404 from "../views/Error404/Error404";
import SignInUpForm from "../views/SignInSingUp/SignInSingUp";
import UserZone from "../views/UserZone/UserZone";
import Hotels from "../views/Hotels/Hotels";
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/Hotels",
    exact: true,
    user: false,
    view: Hotels,
  },
  {
    path: "/signInUp",
    exact: true,
    user: false,
    view: SignInUpForm,
  },
  {
    path: "/user-zone",
    exact: true,
    user: true,
    view: UserZone,
  },
  {
    path: "/",
    exact: true,
    view: Home,
  },
  {
    path: "*",
    view: Error404,
  },
];
