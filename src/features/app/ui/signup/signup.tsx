import React, { useState, useContext } from "react";
import styles from "./signup.module.css";
import { TextInput } from "../../../../components/form/text-input/text-input";
import { PasswordInput } from "../../../../components/form/password-input/password-input";
import { Button } from "../../../../components/button/button";
import { doRegister } from "./../../../../infrastructure/auth/auth";
import { bind } from "../../../../utils/bind";
import { AppContext } from "../../../../app-context";
import { serverResponse } from "../../domain/serverResponse";
import * as EmailValidator from "email-validator";
import { routes } from "../../../../routes/index";

export const Signup: React.FunctionComponent<{}> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const { status, updateApp } = useContext(AppContext);

  const formValidate = () => {
    if (EmailValidator.validate(email)) {
      if (name !== "") {
        if (lastname !== "") {
          if (password !== "" && password.length >= 6) {
            if (password === confirmPassword) {
              return true;
            } else {
              updateApp({
                ...status,
                msg: "La contraseña y su confirmación no coinciden.",
              });

              return false;
            }
          } else {
            updateApp({
              ...status,
              msg: "Debe ingresar una contraseña de por lo menos 6 carácteres.",
            });

            return false;
          }
        } else {
          updateApp({
            ...status,
            msg: "Debe ingresar el apellido",
          });

          return false;
        }
      } else {
        updateApp({
          ...status,
          msg: "Debe ingresar el nombre",
        });

        return false;
      }
    } else {
      updateApp({
        ...status,
        msg: "Ingrese un correo válido.",
      });

      return false;
    }
  };

  const handleRequest = async () => {
    const response: serverResponse = await doRegister(
      email,
      password,
      name,
      lastname
    );
    return response;
  };

  const signup = async () => {
    if (formValidate()) {
      updateApp({ ...status, app: "1" });
      let response: serverResponse = await handleRequest();
      if (response.data.status === "ok" || response.data.status === "error") {
        updateApp({ ...status, app: "0", msg: response.data.message });
      }
    }
  };

  const cancel = () => {
    window.location.href = `${routes.login}`;
  };

  const cx = bind(styles);

  return (
    <>
      <h3>Sign Up</h3>
      <div className={cx("row")}>
        <TextInput
          name={"email"}
          label={"Email"}
          value={email}
          onChange={setEmail}
          className={cx("input")}
        ></TextInput>
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
        <PasswordInput
          label={"Password"}
          value={password}
          onChange={setPassword}
        ></PasswordInput>
      </div>
      <div className={cx("row")}>
        <PasswordInput
          label={"Password"}
          value={confirmPassword}
          onChange={setConfirmPassword}
        ></PasswordInput>
      </div>
      <div className={cx("row")}>
        <Button onClick={signup} theme="primary">
          Aceptar
        </Button>
        <Button onClick={cancel} theme="primary">
          Cancelar
        </Button>
      </div>
    </>
  );
};
