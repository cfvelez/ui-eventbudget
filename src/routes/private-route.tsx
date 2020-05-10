import React, { useContext } from "react";
import { AuthManager } from "../features/app/domain/authManager";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../app-context";

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
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
