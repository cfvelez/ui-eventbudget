/* eslint-disable no-restricted-globals */
import React, { useEffect } from "react";
import { AuthManager } from "../../domain/authManager";
import { routes } from "../../../../routes/index";
import { useHistory } from "react-router-dom";
import { Button } from "../../../../components/button/button";

export const LogOut: React.FunctionComponent<{}> = () => {
  const AuthMng = new AuthManager();
  const history = useHistory();

  const destroyToken = () => {
    AuthMng.logout();
    //history.push(routes.login);
  };

  return (
    <>
      <Button onClick={destroyToken} theme="secondary">
        Salir
      </Button>
    </>
  );
};
