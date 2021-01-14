import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "../organizationPortalAssets/dist/css/adminlte.min.css";
import "../organizationPortalAssets/dist/css/style1.css";
import "../organizationPortalAssets/plugins/fontawesome-free/css/all.min.css";
import routes from "../routes";

import MainNavbar from "./OrganNavbar";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/user") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/user" to="/user/candidateInfo" />
  </Switch>
);

/*
This is organization Portal Main component
It renders sub components by using react roouter dom
1 => Candiate information component
2 => Test Creation component
3 => Test Draft
4 => Final /Designed Tests
5 => Email composition
*/
class organizationPortal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="hold-transition sidebar-mini">
        <div className="wrapper">
          <MainNavbar routes={routes} />
          <div>{switchRoutes}</div>
        </div>
      </div>
    );
  }
}

export default organizationPortal;
