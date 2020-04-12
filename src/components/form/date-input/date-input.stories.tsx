import React, { useState } from "react";
import { DateInput } from "./date-input";

export default {
  title: "DateInput",
  component: DateInput,
};

const WithState: React.FC<{ isRequired: boolean }> = ({ isRequired }) => {
  const [value, setValue] = useState("");
  return (
    <>
      <DateInput
        required={isRequired}
        value={value}
        label="My input"
        onChange={setValue}
      ></DateInput>
      State:{value}
    </>
  );
};

export const base = () => <WithState isRequired={false} />;
export const required = () => <WithState isRequired={true} />;
