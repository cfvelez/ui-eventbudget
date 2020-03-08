import React, { useState } from "react";
import styles from "./login.module.css";
import { TextInput } from "../../../../components/form/text-input/text-input";
import { PasswordInput } from "../../../../components/form/password-input/password-input";
import { Button } from "../../../../components/button/button";
import { bind } from "../../../../utils/bind";

export const Login: React.FunctionComponent<{}> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    alert("hola");
  };

  const cx = bind(styles);

  return (
    <>
      <form>
        <h3>Login</h3>
        <div className={cx("row")}>
          <TextInput
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
          <Button onClick={login} theme="primary">
            Entrar con Google
          </Button>
        </div>
        <div className={cx("row")}>
          <Button onClick={login} theme="secondary">
            Registrarse
          </Button>
        </div>
      </form>
    </>
  );
};
