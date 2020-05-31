import React from "react";
import { bind } from "../../utils/bind";
import styles from "../pagination/pagination.module.css";
interface Props {
  number: number;
  isActive: boolean;
  Click(page: number): void;
}
const cx = bind(styles);
export const Page: React.FunctionComponent<Props> = ({
  number,
  isActive,
  Click,
}) => {
  return (
    <>
      <a
        id={number.toString()}
        key={number}
        onClick={() => Click(number)}
        className={`${isActive ? "active" : "none"}`}
      >
        {number}
      </a>
    </>
  );
};
