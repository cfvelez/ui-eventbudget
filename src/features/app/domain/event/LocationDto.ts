export interface locationDto {
  name: string;
  country: {
    name: string;
    countryCode: string;
  };
  city: {
    name: string;
  };
  state: {
    name: string;
  };
  address: {
    line1: string;
  };
}
