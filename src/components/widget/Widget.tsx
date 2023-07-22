import { IGeoCodingLocation } from "src/models/Geocoder.model";
import { ICurrentWeather } from "src/models/response/Weather.model";
import { getIconWeather } from "src/utils";
import Image from "next/image";
import { IWidget } from "src/models/Wiget.model";

interface WidgetProps {
  location?: IGeoCodingLocation;
  weather?: ICurrentWeather;
  isActive?: boolean;
  onSelectWidget?: (widget: IWidget) => void;
}

export default function Widget(props: WidgetProps) {
  const { location = {} as IGeoCodingLocation, weather = {} as ICurrentWeather, isActive, onSelectWidget } = props;

  return (
    <div
      onClick={() =>
        onSelectWidget?.({
          location,
          weather,
        } as IWidget)
      }
      className={`text-xl border shadow-lg p-4 rounded-lg ${
        isActive ? "bg-blue-400 text-white" : "bg-white"
      } hover:cursor-pointer`}
    >
      <div className={"h-full"}>
        <h3 className="text-2xl">{location.name}</h3>
        <h1 className="text-4xl my-1">{weather.main.temp}°C</h1>
        <Image
          width={20}
          height={20}
          src={getIconWeather(weather.weather[0].icon)}
          alt={weather.weather[0].description}
        />
        <span className="capitalize">{weather.weather[0].description}</span>
        <p className="mt-1 whitespace-nowrap">
          L: {weather.main.temp_min}°C - H: {weather.main.temp_max}°C
        </p>
      </div>
    </div>
  );
}
