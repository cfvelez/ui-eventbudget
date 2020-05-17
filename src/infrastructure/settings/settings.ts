import { httpClient } from "../http-client";
import { SettingsClass } from "../../features/app/domain/settings";
import { serverResponse } from "../../features/app/domain/serverResponse";
import { SettingsDto } from "./settingsDto";
export const getSettings = async () => {
  const URL: string = "/user/settings/";

  const response = await httpClient.get(URL);
  let settings: SettingsDto = {
    _id: "",
    budget: 0,
    numTickets: 0,
    location: "",
    startDate: "",
    endDate: "",
    categories: [],
  };

  if (response.data.data) {
    settings = response.data.data as SettingsDto;
  }

  const dataSettings = new SettingsClass(
    settings._id,
    settings.budget,
    settings.numTickets,
    settings.location,
    settings.startDate,
    settings.endDate,
    settings.categories
  );

  return dataSettings;
};

export const postSettings = async (newSettings: SettingsClass) => {
  const URL: string = "/user/settings/";

  var data = {
    budget: newSettings.budget,
    numTickets: newSettings.numTickets,
    location: newSettings.location,
    startDate: newSettings.getStartDate(),
    endDate: newSettings.getEndDate(),
    categories: newSettings.categories,
  };

  let response: serverResponse = {
    data: { status: "error", message: "", data: null },
  };

  response = Object.assign({}, await httpClient.post(URL, data));

  return response;
};
