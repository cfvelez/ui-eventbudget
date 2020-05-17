import { createContext } from "react";
import { Status } from "./features/app/domain/status";

export const AppContext = createContext<{
  status: Status;
  updateApp: (data: Status) => void;
}>({
  status: { user: "0", app: "0", msg: "" },
  updateApp: (data: Status) => {},
});
