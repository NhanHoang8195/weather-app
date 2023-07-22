import { E_API_FORECAST } from "src/enums/Api.enum";
import { UNIT } from "src/enums/Weather.enum";
import { IGeoCodingLocation } from "src/models/Geocoder.model";
import { ICurrentWeather, IForecastWeather } from "src/models/response/Weather.model";
import { request } from "src/utils/request";
import useHomeStore, { IHomeStore } from "src/zustand-store/Home.store";

export default function useForecast() {
  const { updateCurrentWeather, updateForecastData } = useHomeStore((state: IHomeStore) => ({
    updateCurrentWeather: state.updateCurrentWeather,
    updateForecastData: state.updateForecastData,
  }));
  async function getCurrentWeather(location: IGeoCodingLocation) {
    const weather: ICurrentWeather = await request<ICurrentWeather>({
      url: E_API_FORECAST.CURRENT,
      params: {
        lat: location.lat,
        lon: location.lon,
        units: UNIT.Celsius,
      },
    });
    updateCurrentWeather(weather);
    return weather;
  }

  async function getWeatherForecastNextDays(day: number, location: IGeoCodingLocation) {
    const forecast = await request<IForecastWeather>({
      url: E_API_FORECAST.FIVE_DAY,
      params: {
        lat: location.lat,
        lon: location.lon,
        units: UNIT.Celsius,
        cnt: day * 8,
      },
    });
    updateForecastData(forecast);
    return forecast;
  }

  return {
    getCurrentWeather,
    getWeatherForecastNextDays,
  };
}
