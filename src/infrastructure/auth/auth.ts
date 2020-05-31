import { httpClient } from "../http-client";
import { loginResponse } from "../../features/app/domain/serverResponse";
import { environment } from "../env";
import { AuthManager } from "../../features/app/domain/authManager";

const AuthMng = new AuthManager();

let data: loginResponse = {
  status: "error",
  message: "No response",
  data: "",
};

export const doRegister = async (
  f_email: string,
  f_password: string,
  f_name: string,
  f_lastname: string
) => {
  const URL: string = "/auth/signup/";

  var data = {
    email: f_email,
    password: f_password,
    name: f_name,
    lastname: f_lastname,
  };

  const response = await httpClient.post(URL, data);

  return response;
};

export const doLogin = async (f_email: string, f_password: string) => {
  const URL: string = "/auth/login/";
  var credentials = {
    email: f_email,
    password: f_password,
  };

  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");
  let token = AuthMng.isAuthenticated() ? AuthMng.getToken() : "";
  myHeaders.append("Authorization", "Bearer " + token);

  const info = await fetch(environment + URL, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(credentials),
  });

  data = Object.assign({}, await info.json());
  return data;
};

export const validateAccess = async (token: string) => {
  const URL: string = "/auth/validate/";
  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);

  const info = await fetch(environment + URL, {
    method: "POST",
    headers: myHeaders,
  });
  let data = { status: "error", message: "Invalid Token!", data: [] };
  data = Object.assign({}, await info.json());
  if (data.status === "ok") return true;
  else return false;
};
