import React, { useState, useContext } from "react";
import styles from "./login.module.css";
import { TextInput } from "../../../../components/form/text-input/text-input";
import { PasswordInput } from "../../../../components/form/password-input/password-input";
import { Button } from "../../../../components/button/button";
import { bind } from "../../../../utils/bind";
import { AuthManager } from "../../domain/authManager";
import { AppContext } from "../../../../app-context";
import { useHistory, NavLink } from "react-router-dom";
import { routes } from "../../../../routes/index";
import { doLogin } from "./../../../../infrastructure/auth/auth";
import { serverResponse } from "../../domain/serverResponse";

export const Login: React.FunctionComponent<{}> = () => {
  const { status, updateApp } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const AuthMng = new AuthManager();

  const handleRequest = async () => {
    const response: serverResponse = await doLogin(username, password);
    return response;
  };

  const login = async () => {
    AuthMng.logout();

    updateApp({ ...status, app: "1" });

    const response: serverResponse = await handleRequest();

    if (response.data.status === "ok") {
      const token = response.data.data;
      console.log(token);
      AuthMng.login(token);
      updateApp({ user: "1", app: "0", msg: "Login exitoso" });
    } else {
      updateApp({ user: "0", app: "0", msg: "Error login" });
    }
  };

  const checkAuth = () => {
    return AuthMng.isAuthenticated();
  };

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
        <Button onClick={checkAuth} theme="primary">
          Entrar con Google
        </Button>
      </div>
      <div className={cx("row")}>
        <NavLink to={routes.sign_up} activeClassName={cx("active")}>
          <Button theme="secondary">Registrarse</Button>
        </NavLink>
      </div>
    </>
  );
};
