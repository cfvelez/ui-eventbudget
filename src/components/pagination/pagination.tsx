import React from "react";
import { bind } from "../../utils/bind";
import styles from "./pagination.module.css";
import { Page } from "../page/page";

const cx = bind(styles);

interface Props {
  number: number;
  total: number;
  update(page: number): void;
}

export const Pagination: React.FunctionComponent<Props> = ({
  number,
  total,
  update,
}) => {
  function doPages(current: number, total: number) {
    const list = Array.from(Array(total).keys());

    let pages = [];
    pages = list.map((item, i) => {
      let status = false;
      if (i === current) {
        status = true;
      }
      return (
        <Page
          key={i}
          number={i}
          isActive={status}
          Click={(i) => update(i)}
        ></Page>
      );
    });

    return pages;
  }

  return (
    <>
      <div className={cx("pagination")}>{doPages(number, total)}</div>
    </>
  );
};
