/* eslint-disable no-restricted-globals */
import React, { useContext } from "react";
import { AppContext } from "../../../../app-context";

export const Loader: React.FunctionComponent<{}> = () => {
  const { status } = useContext(AppContext);

  return (
    <span>
      {status.user}-{status.app}-{status.msg}
    </span>
  );
};
