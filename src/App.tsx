import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Signup } from "./features/app/ui/signup/signup";
import { Logout } from "./features/app/ui/logout/logout";
import { Login } from "./features/app/ui/login/login";

import { Loader } from "./features/app/ui/loader/loader";
import { Settings } from "./features/app/ui/settings/settings";
import { ListEvents } from "./features/app/ui/events/list/list";
import { ListFavorites } from "./features/app/ui/favorites/list";

import { Header } from "./features/app/ui/header/header";
import { routes } from "./routes/index";
import { PrivateRoute } from "./routes/private-route";
import { Status } from "./features/app/domain/status";
import { AppContext } from "./app-context";

//import logo from "./logo.svg";

import "./App.css";

//import { Page } from "./components/page/page";

function App() {
  var DefaultState: Status = { user: "0", app: "0", msg: "" };

  const [status, setStatus] = useState<Status>(DefaultState);

  const updateContext = (statusUpdate: Status) => {
    setStatus(statusUpdate);
  };

  return (
    <AppContext.Provider
      value={{
        status: status,
        updateApp: (data: Status) => updateContext(data),
      }}
    >
      <Router>
        <Header></Header>
        <Switch>
          <Route path={routes.login} exact>
            <Login></Login>
          </Route>
          <Route path={`${routes.login}/:gtoken`}>
            <Login></Login>
          </Route>
          <Route path={routes.sign_up} exact>
            <Signup></Signup>
          </Route>
          <PrivateRoute>
            <Settings></Settings>
          </PrivateRoute>
          <Route path={routes.events} exact>
            <PrivateRoute>
              <ListEvents></ListEvents>
            </PrivateRoute>
          </Route>
          <Route path={routes.favorites} exact>
            <PrivateRoute>
              <ListFavorites></ListFavorites>
            </PrivateRoute>
          </Route>
          <Route path={routes.logout} exact>
            <PrivateRoute>
              <Logout></Logout>
            </PrivateRoute>
          </Route>
        </Switch>
      </Router>
      <Loader></Loader>
    </AppContext.Provider>
  );
}

export default App;
