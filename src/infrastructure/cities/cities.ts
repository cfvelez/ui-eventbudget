import { httpClient } from "../http-client";
import { City } from "../../features/app/domain/city";

export const getCities = async () => {
  const URL: string = "/cities/get/";

  interface CityDto {
    _id: String;
    country: String;
    geonameid: String;
    name: String;
    subcountry: String;
  }

  const response = await httpClient.get(URL);
  let cities = [];

  if (response.data.status === "ok") {
    const list = response.data.data;
    cities = list.map((item: CityDto) => {
      return { id: item._id, name: item.name } as City;
    });
  }
  return cities;
};
