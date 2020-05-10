import { httpClient } from "../http-client";

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

  const response = await httpClient.post(URL, data);

  return response;
};
