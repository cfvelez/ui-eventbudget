import React from "react";
import styles from "./checkbox-input.module.css";
import { bind } from "../../../utils/bind";

const cx = bind(styles);

interface Props {
  name?: string;
  label: string;
  value: string;
  required?: boolean;
  min?: string;
  max?: string;
  endSlot?: React.ReactNode;
  checked?: boolean;
  className?: string;
  onChange(value: boolean): void;
}

export const Checkbox: React.FunctionComponent<Props> = ({
  name,
  label,
  value,
  onChange,
  required,
  endSlot,
  checked,
  className,
}) => {
  const isRequired = required && value === "";

  return (
    <label>
      {label}
      <input
        name={name}
        className={cx("input", { required: isRequired })}
        onChange={(event) => onChange(event.target.checked)}
        value={value}
        type="checkbox"
        checked={checked}
      />
      {isRequired && <span>Required field</span>}
      {/*{required && value === '' ? <span>Required field</span> : null}*/}
      <div>{endSlot}</div>
    </label>
  );
};
