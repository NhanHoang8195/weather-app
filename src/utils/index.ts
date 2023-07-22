import { IChartHourly } from "src/models/Chart.model";
import { IForecastWeather } from "src/models/response/Weather.model";
import dayjs from "dayjs";

export function debounce(fn: Function, delay = 500) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: unknown[]): any => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function debounceAsync<U>(fn: (...args: any) => Promise<U>, delay = 500) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any): Promise<U> => {
    return new Promise((resolve, reject) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        try {
          const result = await fn(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}

export function generateLocationNameForGeocoding(location: string): string {
  return `${location},SG`;
}

export function getIconWeather(icon: string): string {
  return `${process.env.NEXT_PUBLIC_WEATHER_ICON}/img/wn/${icon}@2x.png`;
}

export function formatXaxisLineChart(forecast: IForecastWeather): IChartHourly {
  const list = forecast.list || [];
  const result = {
    xAxis: [],
    yAxis: [],
  } as IChartHourly;
  for (let i = 0; i < list.length; i++) {
    const dataAtSpecificDay = dayjs(list[i].dt_txt);
    let text = dataAtSpecificDay.format("HH:mm");
    if (dataAtSpecificDay.hour() === 0) {
      // if hour = 0, then show Month and day only
      text = dataAtSpecificDay.format("MMM DD"); // Jul-23
    }
    result.xAxis.push(text);
    result.yAxis.push(list[i].main.temp);
  }

  return result;
}
