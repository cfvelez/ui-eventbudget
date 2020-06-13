import { httpClient } from "../http-client";

export const doChangePassword = async (
  f_password: string,
  f_new_password: string,
  f_new_confirm_password: string
) => {
  const URL: string = "/user/password/";

  var data = {
    currentPass: f_password,
    newPass: f_new_password,
    newPassConfirm: f_new_confirm_password,
  };

  const response = await httpClient.post(URL, data);

  return response;
};
