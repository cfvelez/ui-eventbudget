import React from "react";
import { bind } from "../../utils/bind";
import styles from "./page.module.css";

const cx = bind(styles);

interface Props {
  title: String;
}

export const Page: React.FunctionComponent<Props> = ({ title, children }) => {
  return (
    <>
      <main className={cx("wrapper")}>
        <div className={cx("box")}>Header</div>
        <div className={cx("box span-column-2")}>{children}</div>
        <div className={cx("box")}>Footer</div>
      </main>
    </>
  );
};
