import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Signup } from "./features/app/ui/signup/signup";
import { Logout } from "./features/app/ui/logout/logout";
import { Login } from "./features/app/ui/login/login";
import { Alert } from "./components/alert/alert";
import { Loader } from "./components/loader/loader";
import { Settings } from "./features/app/ui/settings/settings";
import { ListEvents } from "./features/app/ui/events/list/list";
import { ListFavorites } from "./features/app/ui/favorites/list";
import { Header } from "./components/header/header";
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
        <Loader></Loader>
        <Alert></Alert>
        <Switch>
          <Route path="/" exact>
            <Login></Login>
          </Route>
          <Route path={routes.login} exact>
            <Login></Login>
          </Route>
          <Route path={`${routes.login}/:gtoken`}>
            <Login></Login>
          </Route>
          <Route path={routes.sign_up} exact>
            <Signup></Signup>
          </Route>
          <Route path={routes.settings} exact>
            <PrivateRoute>
              <Settings></Settings>
            </PrivateRoute>
          </Route>
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
          <Route path={routes.security} exact>
            <PrivateRoute></PrivateRoute>
          </Route>
          <Route path={routes.logout} exact>
            <PrivateRoute>
              <Logout></Logout>
            </PrivateRoute>
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
