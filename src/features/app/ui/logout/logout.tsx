/* eslint-disable no-restricted-globals */
import React, { useEffect, useContext } from "react";
import { AuthManager } from "../../domain/authManager";
import { routes } from "../../../../routes/index";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../../app-context";

export const Logout: React.FunctionComponent<{}> = () => {
  const AuthMng = new AuthManager();
  const { status, updateApp } = useContext(AppContext);
  const history = useHistory();

  const destroyToken = () => {
    updateApp({ ...status, user: "0" });
    AuthMng.logout();
    history.push(routes.login);
  };

  useEffect(() => {
    destroyToken();
  }, []);

  return (
    <>
      <div></div>
    </>
  );
};
