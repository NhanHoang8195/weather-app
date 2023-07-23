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
  onRemoveWidget: (widget: IWidget) => void;
}

function Widget(props: WidgetProps) {
  const { location, weather, isActive, onSelectWidget, onRemoveWidget } = props;
  function handleRemoveWidget(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onRemoveWidget({
      location: location as IGeoCodingLocation,
      weather: weather as ICurrentWeather,
    });
  }
  if (!weather || !location) {
    return null;
  }
  return (
    <div
      onClick={() =>
        onSelectWidget?.({
          location,
          weather,
        } as IWidget)
      }
      className={`relative text-xl border shadow-lg p-4 rounded-lg h-full ${
        isActive ? "bg-blue-400 text-white" : "bg-white"
      } hover:cursor-pointer`}
    >
      <button
        onClick={handleRemoveWidget}
        className="z-10 absolute p-1 text-sm rounded-full border text-slate-500 w-10 h-10 top-1 right-1 bg-white shadow-lg"
      >
        X
      </button>
      <div className={"relative h-full"}>
        <h3 className="text-2xl text-ellipsis whitespace-nowrap overflow-hidden">{location.name}</h3>
        <h1 className="text-4xl my-1">{weather.main.temp}°C</h1>
        <Image
          width={30}
          height={30}
          src={getIconWeather(weather.weather[0].icon)}
          alt={weather.weather[0].description}
        />
        <span className="capitalize">{weather.weather[0].description}</span>
        <p className="mt-1 whitespace-nowrap text-sm text-ellipsis">
          L: {weather.main.temp_min}°C - H: {weather.main.temp_max}°C
        </p>
      </div>
    </div>
  );
}

export default Widget;
