import { httpClient } from "../http-client";
import { serverResponse } from "../../features/app/domain/serverResponse";
import { environment } from "../env";

let response: serverResponse = {
  data: {
    status: "error",
    message: "No response",
    data: null,
  },
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
  var data = {
    email: f_email,
    password: f_password,
  };
  response = Object.assign({}, await httpClient.post(URL, data));
  return response;
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
