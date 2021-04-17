import Home from "../views/Home/Home";
import Error404 from "../views/Error404/Error404";
import SignInUpForm from "./../views/SignInSingUp/SignInSingUp";
import UserZone from "./../views/UserZone/UserZone";
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/signInUp",
    exact: true,
    view: SignInUpForm,
  },
  {
    path: "/user-zone",
    exact: true,
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
