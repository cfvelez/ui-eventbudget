import React from "react";

interface Props {
  url?: "";
  method?: "";
}

export const Form: React.FunctionComponent<Props> = ({
  url,
  method,
  children
}) => {
  return (
    <form action={url} method={method}>
      {children}
    </form>
  );
};
