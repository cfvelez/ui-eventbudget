import { httpClient } from "../http-client";
import { SettingsClass } from "../../features/app/domain/settings";
import { serverResponse } from "../../features/app/domain/serverResponse";

export const getSettings = async () => {
  const URL: string = "/user/settings/";

  interface SettingsDto {
    categories: string[];
    _id: string;
    budget: number;
    numTickets: number;
    location: string;
    startDate: string;
    endDate: string;
  }

  const response = await httpClient.get(URL);
  const settings = response.data as SettingsDto;
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

  const response: serverResponse = await httpClient.post(URL, data);

  return response;
};
