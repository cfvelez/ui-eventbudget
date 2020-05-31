import { httpClient } from "../http-client";
import { City } from "../../features/app/domain/city";
import { AuthManager } from "../../features/app/domain/authManager";

export const getCities = async () => {
  const URL: string = "/cities/get/";

  interface CityDto {
    _id: String;
    country: String;
    geonameid: String;
    name: String;
    subcountry: String;
  }
  setHeaders();
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

function setHeaders() {
  const AuthMng = new AuthManager();
  httpClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${AuthMng.getToken()}`;
}
