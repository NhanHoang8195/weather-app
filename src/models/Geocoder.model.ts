import { UNIT } from "src/enums/Weather.enum";

export interface IForecastParams {
  lat: number;
  lon: number;
  cnt?: string; // number of timestamp
  mode?: string;
  units?: UNIT; // standard, metric and imperial
  lang?: string;
}

export interface IGeocodingParams {
  q: string;
  limit?: string;
}

export interface IGeoLocation {
  lat: string;
  lon: string;
}

export interface IGeoCodingLocation extends IGeoLocation {
  name: string;
  local_names: string;
  country: string;
}
