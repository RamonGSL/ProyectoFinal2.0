import Home from "../views/Home/index";
import Error404 from "../views/Error404/index.js";
import SignInUpForm from "./../views/SignInSingUp/index";
import UserZone from "./../views/UserZone/UserZone";
// eslint-disable-next-line import/no-anonymous-default-export
export default [
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
    path: "/user-zone",
    exact: true,
    view: SignInUpForm,
  },
  {
    path: "*",
    view: Error404,
  },
];
