import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./features/app/ui/login/login";
import { Settings } from "./features/app/ui/settings/settings";
import { List } from "./features/app/ui/events/list/list";
//import { Signup } from "./features/app/ui/signup/signup";
import { Header } from "./features/app/ui/header/header";
import { routes } from "./routes";
import { AuthManager } from "./features/app/domain/authManager";
//import { Signup } from "./features/app/ui/signup/signup";
//import logo from "./logo.svg";
import "./App.css";
//import { Page } from "./components/page/page";

function App() {
  const AuthMng = new AuthManager();
  console.log(AuthMng.isAuthenticated());

  return (
    <>
      <Router>
        <Header></Header>
        <Switch>
          <Route path={routes.login} exact>
            <Login></Login>
          </Route>
          <Route path={routes.settings} exact>
            <Settings></Settings>
          </Route>
          <Route path={routes.events} exact>
            <List></List>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
