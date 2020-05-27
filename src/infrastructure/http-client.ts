import axios from "axios";
import { AuthManager } from "../features/app/domain/authManager";
import { environment } from "../infrastructure/env";
const AuthMng = new AuthManager();
console.log("5.0", AuthMng.isAuthenticated());
let tokenHeader = AuthMng.isAuthenticated() ? AuthMng.getToken() : "";
console.log("token 5:", tokenHeader);
console.log(environment);
const httpClient = axios.create({
  baseURL: environment,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenHeader}`,
  },
});

export { httpClient };
