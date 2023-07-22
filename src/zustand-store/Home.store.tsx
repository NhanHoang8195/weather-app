import { OPTIONS } from "src/constants";
import { IGeoCodingLocation } from "src/models/Geocoder.model";
import { IWidget } from "src/models/Wiget.model";
import { create } from "zustand";
import { ICurrentWeather, IForecastWeather } from "src/models/response/Weather.model";

export interface IHomeStore {
  selectedLocation?: IGeoCodingLocation;
  updateSelectedOption: (newSelected: IGeoCodingLocation) => void;
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
  currentWeather: ICurrentWeather;
  updateCurrentWeather: (currentWeather: ICurrentWeather) => void;
}

const useHomeStore = create<IHomeStore>((set) => ({
  searchLocationValue: "",
  currentWeather: {} as ICurrentWeather,
  selectedForecastDayOption: OPTIONS[0],
  forecast: {} as IForecastWeather,
  widgets: [],
  selectedWidget: null,
  updateSelectedOption: (newSelected: IGeoCodingLocation) =>
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
