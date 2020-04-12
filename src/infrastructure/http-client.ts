import axios from "axios";
import { AuthManager } from "../features/app/domain/authManager";
const AuthMng = new AuthManager();

const tokenHeader = AuthMng.isAuthenticated
  ? localStorage.getItem("token")
  : "";

const httpClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Control-Allow-Origin": "*",
    Authorization: `Bearer ${tokenHeader}`,
  },
});

export { httpClient };
