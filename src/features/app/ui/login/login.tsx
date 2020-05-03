import React, { useState } from "react";
import styles from "./login.module.css";
import { TextInput } from "../../../../components/form/text-input/text-input";
import { PasswordInput } from "../../../../components/form/password-input/password-input";
import { Button } from "../../../../components/button/button";
import { bind } from "../../../../utils/bind";
import { httpClient } from "../../../../infrastructure/http-client";
import { AuthManager } from "../../domain/authManager";
import { routes } from "../../../../routes/index";
import { useHistory, useLocation } from "react-router-dom";

export const Login: React.FunctionComponent<{}> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const AuthMng = new AuthManager();

  const login = async () => {
    const URL: string = "/auth/login/";
    var data = {
      email: username,
      password: password,
    };

    const response = await httpClient.post(URL, data);

    if (response.data.result === "ok") {
      const token = response.data.token;
      AuthMng.login(token);
      //history.push(routes.settings);
    } else {
      console.log("error de login");
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
        <Button onClick={login} theme="secondary">
          Registrarse
        </Button>
      </div>
    </>
  );
};
