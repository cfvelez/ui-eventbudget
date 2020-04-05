import React, { useState } from "react";
import styles from "./signup.module.css";
import { TextInput } from "../../../../components/form/text-input/text-input";
import { PasswordInput } from "../../../../components/form/password-input/password-input";
import { Button } from "../../../../components/button/button";
import { bind } from "../../../../utils/bind";

export const Signup: React.FunctionComponent<{}> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");

  const login = () => {
    const inputUsername = document.getElementsByName("signup");
    console.log(inputUsername);
  };

  const cx = bind(styles);

  return (
    <>
      <form
        method="post"
        name="signup"
        action="http://localhost:3000/auth/signup/"
      >
        <h3>Sign Up</h3>
        <div className={cx("row")}>
          <TextInput
            name={"email"}
            label={"email"}
            value={email}
            onChange={setEmail}
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
          <TextInput
            name={"name"}
            label={"name"}
            value={name}
            onChange={setName}
            className={cx("input")}
          ></TextInput>
        </div>
        <div className={cx("row")}>
          <TextInput
            name={"lastname"}
            label={"lastname"}
            value={lastname}
            onChange={setLastName}
            className={cx("input")}
          ></TextInput>
        </div>
        <div className={cx("row")}>
          <Button onClick={login} theme="primary">
            Aceptar
          </Button>
          <Button onClick={login} theme="primary">
            Cancelar
          </Button>
        </div>
      </form>
    </>
  );
};
