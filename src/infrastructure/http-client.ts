import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Control-Allow-Origin": "*"
  }
});

export { httpClient };
