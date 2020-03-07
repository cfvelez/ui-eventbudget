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
      <section className={cx("login")}>
        <div>
          <TextInput
            label={"Usuario"}
            value={username}
            onChange={setUsername}
            className="input"
          ></TextInput>
        </div>
        <div>
          <PasswordInput
            label={"Password"}
            value={password}
            onChange={setPassword}
          ></PasswordInput>
        </div>
        <div>
          <Button onClick={login}>Login</Button>
        </div>
      </section>
    </>
  );
};
