import React, { useMemo } from "react";
import useHomeStore, { IHomeStore } from "src/zustand-store/Home.store";
import dayjs from "dayjs";
import { City, ICurrentWeather } from "src/models/response/Weather.model";
import Image from "next/image";
import { getIconWeather } from "src/utils";

interface DateForecastProps {
  className?: string;
}

const DateForecast = (props: DateForecastProps) => {
  const { className } = props;
  const { listForeCast, city, location } = useHomeStore((state: IHomeStore) => ({
    listForeCast: (state.forecast.list || []) as ICurrentWeather[],
    city: (state.forecast.city || {}) as City,
    location: state.selectedLocation,
  }));

  const formatData = useMemo(() => {
    return listForeCast.filter((item) => {
      return dayjs(item.dt_txt).hour() === 0; // take at 0 am
    });
  }, [listForeCast]);

  const selectedForecastDayOption = useHomeStore((state: IHomeStore) => state.selectedForecastDayOption);
  return (
    <div className={`${className} border shadow-lg`}>
      <h3 className="font-bold">
        {selectedForecastDayOption.label} forecast {location?.name ? `at ${location.name}` : ""}
      </h3>
      <div>
        {formatData.map((item) => {
          return (
            <div className="flex gap-1 justify-between py-2 text-xs" key={item.dt_txt}>
              <span>{dayjs(item.dt_txt).format("ddd, MMM DD")}</span>
              <p className="flex">
                <Image
                  width={20}
                  height={20}
                  src={getIconWeather(item.weather[0].icon)}
                  alt={item.weather[0].description}
                />
                <span>
                  {item.main.temp_min} / {item.main.temp_max}
                </span>
              </p>
              <p className="capitalize">{item.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateForecast;
