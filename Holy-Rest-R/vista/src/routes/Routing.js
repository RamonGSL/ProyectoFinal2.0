import { React, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { map } from "lodash";
import configRouting from "./configRouting";
import Menu from "./../components/Menu/Menu";
import UserZone from "./../views/UserZone/UserZone";
import SignInSingUp from "./../views/SignInSingUp/SignInSingUp";
import { isUserLoged } from "./../api/user";

export default function Routing() {
  const [user, setUser] = useState(isUserLoged());

  return (
    <Router>
      <div className="basic-layout__menu">
        <Menu />
      </div>
      <Switch>
        {map(configRouting, (route, index) => (
          <Route key={index} path={route.path} exact={route.exact}>
            <div className="basic-layout__content">
              {route.path !== "/user-zone" && route.path !== "/signInUp" ? (
                <route.view />
              ) : null}

              {route.path === "/user-zone" && user === true ? (
                <UserZone />
              ) : null}

              {route.path === "/signInUp" && user === false ? (
                <SignInSingUp />
              ) : null}

              {route.path === "/user-zone" && user === false ? (
                <SignInSingUp />
              ) : null}

              {route.path === "/signInUp" && user === true ? (
                <UserZone />
              ) : null}

              {/*  <route.view /> */}
            </div>
          </Route>
        ))}
      </Switch>
    </Router>
  );
}
