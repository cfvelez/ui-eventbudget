import React, { useState, useContext, useEffect } from "react";
import styles from "./login.module.css";
import { TextInput } from "../../../../components/form/text-input/text-input";
import { PasswordInput } from "../../../../components/form/password-input/password-input";
import { Button } from "../../../../components/button/button";
import { bind } from "../../../../utils/bind";
import { AuthManager } from "../../domain/authManager";
import { AppContext } from "../../../../app-context";
import { useHistory } from "react-router-dom";
import { routes } from "../../../../routes/index";
import { environment } from "../../../../infrastructure/env";
import {
  doLogin,
  validateAccess,
} from "./../../../../infrastructure/auth/auth";
import { loginResponse } from "../../domain/serverResponse";
import { useParams } from "react-router-dom";

export const Login: React.FunctionComponent<{}> = () => {
  const { status, updateApp } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { gtoken } = useParams();

  const history = useHistory();

  const AuthMng = new AuthManager();

  const handleRequest = async () => {
    const response: loginResponse = await doLogin(username, password);
    return response;
  };

  const google = () => {
    window.location.href = `${environment}/auth/google/`;
  };

  const sigUp = () => {
    window.location.href = routes.sign_up;
  };

  const login = async () => {
    AuthMng.logout();
    updateApp({ ...status, app: "1" });

    let response = (await handleRequest()) as loginResponse;

    if (response.status === "ok") {
      const token = response.data;

      AuthMng.login(token);

      if (AuthMng.isAuthenticated()) {
        updateApp({ user: "1", app: "0", msg: "s|Login exitoso" });
      }
      history.replace(routes.settings);
    } else {
      updateApp({ user: "0", app: "0", msg: "e|Usuario / Clave incorrectos" });
    }
  };

  const validateToken = async (receivedToken: string) => {
    updateApp({ ...status, app: "1" });

    const authorized = await validateAccess(receivedToken);
    if (authorized === true) {
      AuthMng.login(receivedToken);

      updateApp({ user: "1", app: "0", msg: "s|Login exitoso" });
      history.replace(routes.settings);
    } else {
      updateApp({ user: "0", app: "0", msg: "e|Error login" });
      AuthMng.logout();
    }
  };

  useEffect(() => {
    const receivedToken = gtoken !== undefined && gtoken !== null ? gtoken : "";
    AuthMng.logout();
    if (receivedToken !== "") {
      console.log(receivedToken);
      //validateToken(receivedToken);
    }
  }, []);

  const cx = bind(styles);

  return (
    <>
      <h3>Login</h3>
      <div className={cx("row")}>
        <TextInput
          name={"usuario"}
          label={"Usuario"}
          value={username}
          onChange={setUsername}
          className={cx("input")}
        ></TextInput>
      </div>
      <div className={cx("row")}>
        <PasswordInput
          label={"Password"}
          value={password}
          onChange={setPassword}
        ></PasswordInput>
      </div>
      <div className={cx("row")}>
        <Button onClick={login} theme="primary">
          Entrar
        </Button>

        <Button onClick={google} theme="primary">
          Ingresar con Google
        </Button>

        <Button onClick={sigUp} theme="primary">
          Registrarse
        </Button>
      </div>
    </>
  );
};
