import Home from "./../views/Home/Index";
import Error404 from "./../views/Error404/Index.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
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
