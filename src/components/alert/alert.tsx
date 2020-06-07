/* eslint-disable no-restricted-globals */
import React, { useContext, useState, useEffect } from "react";
import { bind } from "../../utils/bind";
import styles from "./alert.module.css";
import { AppContext } from "../../app-context";
const cx = bind(styles);

export const Alert: React.FunctionComponent<{}> = () => {
  const { status, updateApp } = useContext(AppContext);
  const [type, setType] = useState("alert-warning");
  let message: String = status.msg;

  const hideAlert = () => {
    updateApp({ ...status, msg: "" });
  };

  const identifyType = () => {
    const result = message.split("|");
    if (Array.isArray(result)) {
      switch (result[0]) {
        case "e":
          setType("alert-error");
          break;
        case "w":
          setType("alert-warning");
          break;
        case "s":
          setType("alert-success");
          break;
        default:
          setType("alert-error");
          break;
      }
    }
  };

  useEffect(() => {
    identifyType();
  });

  return (
    <>
      <div className={cx("row")}>
        <div
          className={`${
            status.msg !== "" ? cx(type) : cx("error-message-empty")
          }`}
        >
          <span className={cx("closebtn")} onClick={hideAlert}>
            &times;
          </span>
          {status.msg.replace(/^.{2}/, "")}
        </div>
      </div>
    </>
  );
};
