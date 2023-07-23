import { OPTIONS } from "src/constants";
import { IGeoCodingLocation } from "src/models/Geocoder.model";
import { IWidget } from "src/models/Wiget.model";
import { create } from "zustand";
import { ICurrentWeather, IForecastWeather } from "src/models/response/Weather.model";

export interface IHomeStore {
  selectedLocation?: IGeoCodingLocation;
  updateSelectedLocation: (newSelected: IGeoCodingLocation) => void;
  widgets: IWidget[];
  updateWidget: (widget: IWidget) => void;
  selectedWidget: IWidget | null;
  updateSelectedWidget: (widget: IWidget) => void;
  selectedForecastDayOption: {
    label: string;
    value: number;
  };
  updateForcastDaySelection: (selectedValue: { label: string; value: number }) => void;
  forecast: IForecastWeather;
  updateForecastData: (forecast: IForecastWeather) => void;
  currentWeather: ICurrentWeather | null;
  updateCurrentWeather: (currentWeather: ICurrentWeather) => void;
  replaceWidgets: (widgets: IWidget[]) => void; // used to replace the whole widgets.
}

const useHomeStore = create<IHomeStore>((set) => ({
  searchLocationValue: "",
  currentWeather: null,
  selectedForecastDayOption: OPTIONS[0],
  forecast: {} as IForecastWeather,
  widgets: [],
  selectedWidget: null,
  updateSelectedLocation: (newSelected: IGeoCodingLocation) =>
    set(() => ({
      selectedLocation: newSelected,
    })),
  updateWidget: (widget: IWidget) =>
    set((state) => ({
      widgets: [...state.widgets, widget],
    })),
  updateSelectedWidget: (widget: IWidget) =>
    set(() => ({
      selectedWidget: widget,
    })),
  replaceWidgets: (widgets: IWidget[]) =>
    set(() => ({
      widgets: widgets,
    })),
  updateForcastDaySelection: (option) =>
    set(() => ({
      selectedForecastDayOption: option,
    })),
  updateForecastData: (forecast) =>
    set(() => ({
      forecast,
    })),
  updateCurrentWeather: (currentWeather) =>
    set(() => ({
      currentWeather,
    })),
}));

export default useHomeStore;
