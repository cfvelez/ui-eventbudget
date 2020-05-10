import { binary } from "./binaryType";

export interface Status {
  user: binary;
  app: binary;
  msg: string;
}
