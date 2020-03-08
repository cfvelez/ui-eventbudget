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
      <main className={cx("wrapper")}>
        <div className={cx("box")}>
          <h2>Login</h2>
        </div>
        <div className={cx("box")}>
          <TextInput
            label={"Usuario"}
            value={username}
            onChange={setUsername}
            className={cx("input")}
          ></TextInput>
        </div>
        <div className={cx("box")}>
          <PasswordInput
            label={"Password"}
            value={password}
            onChange={setPassword}
          ></PasswordInput>
        </div>
        <div className={cx("box")}>
          <Button onClick={login} theme="primary">
            Login
          </Button>
        </div>
      </main>
    </>
  );
};
