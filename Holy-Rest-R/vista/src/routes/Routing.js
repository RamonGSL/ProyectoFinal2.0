import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { map } from "lodash";
import configRouting from "./configRouting";
import Menu from "./../components/Menu/Menu";

export default function Routing() {
  return (
    <Router>
      <div className="basic-layout__menu">
        <Menu />
      </div>
      <Switch>
        {map(configRouting, (route, index) => (
          <Route key={index} path={route.path} exact={route.exact}>
            <div className="basic-layout__content">
              <route.view />
            </div>
          </Route>
        ))}
      </Switch>
    </Router>
  );
}
