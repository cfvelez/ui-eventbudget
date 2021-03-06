import React from "react";
import styles from "./base-input.module.css";
import { bind } from "../../../utils/bind";

const cx = bind(styles);

interface Props {
  name?: string;
  label: string;
  value: string;
  required?: boolean;
  type: "text" | "password" | "date" | "checkbox";
  min?: string;
  max?: string;
  endSlot?: React.ReactNode;
  checked?: boolean;
  onChange(value: string): void;
}

export const BaseInput: React.FunctionComponent<Props> = ({
  name,
  label,
  value,
  onChange,
  required,
  type,
  endSlot,
  min,
  max,
  checked,
}) => {
  const isRequired = required && value === "";

  return (
    <label>
      {label}
      <input
        name={name}
        className={cx("input", { required: isRequired })}
        onChange={(event) => onChange(event.target.value)}
        value={value}
        type={type}
        min={min}
        max={max}
        checked={checked}
      />
      {isRequired && <span>Required field</span>}
      {/*{required && value === '' ? <span>Required field</span> : null}*/}
      <div>{endSlot}</div>
    </label>
  );
};
