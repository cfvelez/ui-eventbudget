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
  const [success, setSuccess] = useState(false);

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
                msg: "w|La contraseña y su confirmación no coinciden.",
              });

              return false;
            }
          } else {
            updateApp({
              ...status,
              msg:
                "w|Debe ingresar una contraseña de por lo menos 6 carácteres.",
            });

            return false;
          }
        } else {
          updateApp({
            ...status,
            msg: "w|Debe ingresar el apellido",
          });

          return false;
        }
      } else {
        updateApp({
          ...status,
          msg: "w|Debe ingresar el nombre",
        });

        return false;
      }
    } else {
      updateApp({
        ...status,
        msg: "s|Ingrese un correo válido.",
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
        updateApp({ ...status, app: "0", msg: "s|" + response.data.message });
        setSuccess(true);
      }
    }
  };

  const cancel = () => {
    window.location.href = `${routes.login}`;
  };

  const cx = bind(styles);

  return (
    <>
      <div className={success ? cx("not-visible ") : cx("")}>
        <div className={cx("row")}>
          <h3>Registro</h3>
        </div>

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
            label={"Nombre:"}
            value={name}
            onChange={setName}
            className={cx("input")}
          ></TextInput>
        </div>
        <div className={cx("row")}>
          <TextInput
            name={"lastname"}
            label={"Apellidos:"}
            value={lastname}
            onChange={setLastName}
            className={cx("input")}
          ></TextInput>
        </div>
        <div className={cx("row")}>
          <PasswordInput
            label={"Clave:"}
            value={password}
            onChange={setPassword}
          ></PasswordInput>
        </div>
        <div className={cx("row")}>
          <PasswordInput
            label={"Confirma Clave:"}
            value={confirmPassword}
            onChange={setConfirmPassword}
          ></PasswordInput>
        </div>
        <div className={cx("row")}>
          <Button onClick={cancel} theme="secondary">
            Cancelar
          </Button>
          <Button onClick={signup} theme="primary">
            Aceptar
          </Button>
        </div>
      </div>
      <div className={cx("row")}>
        {success && (
          <Button onClick={cancel} theme="google">
            Acceder
          </Button>
        )}
      </div>
    </>
  );
};
