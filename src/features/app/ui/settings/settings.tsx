import React, { useState, useEffect } from "react";
import styles from "./settings.module.css";
import { TextInput } from "../../../../components/form/text-input/text-input";
import { SelectInput } from "../../../../components/form/select/base-select";
import { PasswordInput } from "../../../../components/form/password-input/password-input";
import { Button } from "../../../../components/button/button";
import { bind } from "../../../../utils/bind";

export const Settings: React.FunctionComponent<{}> = () => {
  const [budget, setBudget] = useState("");
  const [tickets, setTickets] = useState("");
  const [city, setCity] = useState("");

  const cx = bind(styles);

  const onHandleBudgetChange = (value: string) => {
    if (Number(value)) {
      setBudget(value);
    }

    if (value.length === 0) setBudget("");
  };

  const onHandleTicketsChange = (value: string) => {
    if (Number(value)) {
      setTickets(value);
    }

    if (value.length === 0) setTickets("");
  };

  const items = [
    { id: "1", name: "España" },
    { id: "2", name: "Italia" },
    { id: "3", name: "Alemania" },
  ];

  useEffect(() => {
    setCity("3");
  });

  return (
    <>
      <h3>Settings</h3>
      <div className={cx("row")}>
        <TextInput
          name={"budget"}
          label={"budget"}
          value={budget}
          onChange={(value) => onHandleBudgetChange(value)}
          className={cx("input")}
        ></TextInput>
      </div>
      <div className={cx("row")}>
        <TextInput
          name={"tickets"}
          label={"tickets"}
          value={tickets}
          onChange={(value) => onHandleTicketsChange(value)}
          className={cx("input")}
        ></TextInput>
      </div>
      <div className={cx("row")}>
        <SelectInput
          className={cx("select")}
          currentValue={city}
          name={"city"}
          label={"city"}
          options={items}
          onChange={(e) => {
            console.log(e);
            setCity(e);
          }}
        ></SelectInput>
      </div>
    </>
  );
};
