import axios from "axios";
import { environment } from "../infrastructure/env";

const httpClient = axios.create({
  baseURL: environment,
  headers: {
    "Content-Type": "application/json",
  },
});

export { httpClient };
