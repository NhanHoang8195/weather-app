import { IGeoLocation } from "../Geocoder.model";

export interface ICurrentWeather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface City {
  id: number;
  name: "Singapore";
  coord: IGeoLocation;
  country: "SG";
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface IForecastWeather {
  list: Omit<ICurrentWeather, "city" | "timezone" | "id" | "cod">[];
  city: City;
}
