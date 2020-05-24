import axios from "axios";
import { AuthManager } from "../features/app/domain/authManager";
const AuthMng = new AuthManager();
console.log("5.0", AuthMng.isAuthenticated());
const tokenHeader = AuthMng.isAuthenticated() ? AuthMng.getToken() : "";
console.log("token 5:", tokenHeader);

const httpClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenHeader}`,
  },
});

export { httpClient };
