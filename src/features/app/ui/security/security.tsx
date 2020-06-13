import React, { useState, useContext, useEffect } from "react";
import styles from "./security.module.css";
import { PasswordInput } from "../../../../components/form/password-input/password-input";
import { Button } from "../../../../components/button/button";
import { bind } from "../../../../utils/bind";
import { AppContext } from "../../../../app-context";
import { serverResponse } from "../../domain/serverResponse";
import { doChangePassword } from "../../../../infrastructure/security/security";

export const Security: React.FunctionComponent<{}> = () => {
  const { status, updateApp } = useContext(AppContext);
  const [CurrentPassword, setCurrentPassword] = useState("");
  const [Newpassword, setNewPassword] = useState("");
  const [NewConfirmpassword, setNewConfirmPassword] = useState("");

  const handleRequest = async () => {
    return await doChangePassword(
      CurrentPassword,
      Newpassword,
      NewConfirmpassword
    );
  };

  const changePass = async () => {
    updateApp({ ...status, app: "1" });

    let response = (await handleRequest()) as serverResponse;

    if (response.data.status === "ok") {
      updateApp({
        ...status,
        app: "0",
        msg: "s|Clave actualizada exitosamente.",
      });
    } else {
      updateApp({ ...status, app: "0", msg: "w|" + response.data.message });
    }
  };

  const cx = bind(styles);

  return (
    <>
      <h3>Cambiar clave</h3>
      <div className={cx("row")}>
        <PasswordInput
          label={"Clave actual"}
          value={CurrentPassword}
          onChange={setCurrentPassword}
        ></PasswordInput>
      </div>
      <div className={cx("row")}>
        <PasswordInput
          label={"Clave nueva"}
          value={Newpassword}
          onChange={setNewPassword}
        ></PasswordInput>
      </div>
      <div className={cx("row")}>
        <PasswordInput
          label={"Confirmar clave"}
          value={NewConfirmpassword}
          onChange={setNewConfirmPassword}
        ></PasswordInput>
      </div>
      <div className={cx("row")}>
        <Button onClick={changePass} theme="primary">
          Confirmar
        </Button>
      </div>
    </>
  );
};
