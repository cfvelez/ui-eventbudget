/* eslint-disable no-restricted-globals */
import React, { useContext } from "react";
import { bind } from "../../utils/bind";
import styles from "./loader.module.css";
import { AppContext } from "../../app-context";
const cx = bind(styles);

export const Loader: React.FunctionComponent<{}> = () => {
  const { status } = useContext(AppContext);

  return (
    <>
      <div className={cx("row")}>
        <div
          className={`${status.app === "1" ? cx("loader") : cx("none")}`}
        ></div>
      </div>
    </>
  );
};
