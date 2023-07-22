import { IGeoCodingLocation } from "./Geocoder.model";
import { ICurrentWeather } from "./response/Weather.model";

export interface IWidget {
  location: IGeoCodingLocation;
  weather: ICurrentWeather;
}
