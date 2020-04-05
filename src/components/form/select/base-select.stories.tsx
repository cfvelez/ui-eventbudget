import React, { useState } from "react";
import { SelectInput } from "./base-select";

export default {
  title: "SelectInput",
  component: SelectInput,
};

const WithState: React.FC<{ isRequired: boolean }> = ({ isRequired }) => {
  const [value, setValue] = useState("");
  return (
    <>
      <SelectInput label={"select"} onChange={() => {}}></SelectInput>
    </>
  );
};

export const base = () => <WithState isRequired={false} />;
export const required = () => <WithState isRequired={true} />;
