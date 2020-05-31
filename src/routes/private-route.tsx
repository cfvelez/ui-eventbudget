import React, { useContext } from "react";
import { AuthManager } from "../features/app/domain/authManager";
import { Route } from "react-router-dom";
import { AppContext } from "../app-context";
import { Login } from "../features/app/ui/login/login";

export const PrivateRoute: React.FC = ({ children, ...rest }) => {
  const authManager = new AuthManager();
  const { status } = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authManager.isAuthenticated() && status.user === "1" ? (
          children
        ) : (
          <Login />
        )
      }
    />
  );
};
