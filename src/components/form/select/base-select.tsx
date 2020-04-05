import React from "react";
import styles from "./base-select.module.css";
import { bind } from "../../../utils/bind";

const cx = bind(styles);

interface item {
  id: string;
  name: string;
}

interface Props {
  name?: string;
  label: string;
  currentValue?: string;
  options?: Array<item>;
  className?: string;
  onChange(value: string): void;
}

export const SelectInput: React.FunctionComponent<Props> = ({
  name,
  label,
  options,
  className,
  currentValue,
  onChange,
}) => {
  return (
    <label>
      {label}
      <select
        value={currentValue}
        className={cx({ className })}
        onChange={(event) => onChange(event.target.value)}
      >
        {options?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </label>
  );
};
