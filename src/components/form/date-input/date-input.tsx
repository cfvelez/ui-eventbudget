import React from "react";

import { BaseInput } from "../base-input/base-input";
import { Input } from "../input";

export const DateInput: React.FunctionComponent<Input<string>> = (props) => {
  return <BaseInput {...props} type={"date"} />;
};
