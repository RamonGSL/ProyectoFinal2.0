import Home from "../views/Home/index";
import Error404 from "../views/Error404/index.js";
import SignInUpForm from "./../views/SignInSingUp/index";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
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
