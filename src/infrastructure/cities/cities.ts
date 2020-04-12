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
  const cities = response.data.map((item: CityDto) => {
    return { id: item._id, name: item.name } as City;
  });

  return cities;

  /*if (response.data.result === "ok") {
    const token = response.data.token;
    localStorage.setItem("token", token);
  } else {
    console.log("error de login");
  }*/
};
