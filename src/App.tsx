import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LogOut } from "./features/app/ui/logout/logout";
import { Login } from "./features/app/ui/login/login";
import { Settings } from "./features/app/ui/settings/settings";
import { ListEvents } from "./features/app/ui/events/list/list";
import { ListFavorites } from "./features/app/ui/favorites/list";
//import { Signup } from "./features/app/ui/signup/signup";
import { Header } from "./features/app/ui/header/header";
import { routes } from "./routes/index";
import { PrivateRoute } from "./routes/private-route";
//import { Signup } from "./features/app/ui/signup/signup";
//import logo from "./logo.svg";
import "./App.css";

//import { Page } from "./components/page/page";

function App() {
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
            <ListEvents></ListEvents>
          </Route>
          <PrivateRoute>
            <ListFavorites></ListFavorites>
          </PrivateRoute>
          <PrivateRoute>
            <LogOut></LogOut>
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
}

export default App;
