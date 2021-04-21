import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { map } from "lodash";
import configRouting from "./configRouting";
import Menu from "./../components/Menu/Menu";
import UserZone from "./../views/UserZone/UserZone";
import SignInSingUp from "./../views/SignInSingUp/SignInSingUp";

export default function Routing() {
  const comprobateUser = false;
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

              {route.path === "/user-zone" && comprobateUser === true ? (
                <UserZone />
              ) : null}

              {route.path === "/signInUp" && comprobateUser === false ? (
                <SignInSingUp />
              ) : null}

              {/*  <route.view /> */}
            </div>
          </Route>
        ))}
      </Switch>
    </Router>
  );
}
