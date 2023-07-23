import { useState, useCallback, useMemo } from "react";
import useGeoLocation from "src/hooks/useGeoLocation";
import { IGeoCodingLocation, IGeoLocation } from "src/models/Geocoder.model";
import { SingleValue } from "react-select";
import useHomeStore, { IHomeStore } from "src/zustand-store/Home.store";
import useForecast from "src/hooks/useForecast";
import { shallow } from "zustand/shallow";
import { IWidget } from "src/models/Wiget.model";

interface IOptions {
  value: IGeoCodingLocation;
  label: string;
}

export default function useHome() {
  const { fetchLocation } = useGeoLocation();
  const { getCurrentWeather, getWeatherForecastNextDays } = useForecast();
  const [locationOptions, setLocationOptions] = useState<any>(true);
  const {
    updateSelectedLocation,
    selectedLocation,
    selectedForecastDayOption,
    updateForcastDaySelection,
    updateForcastData,
    updateSelectedWidget,
  } = useHomeStore(
    (state: IHomeStore) => ({
      updateSelectedLocation: state.updateSelectedLocation,
      updateWidget: state.updateWidget,
      selectedLocation: state.selectedLocation,
      selectedForecastDayOption: state.selectedForecastDayOption,
      updateForcastDaySelection: state.updateForcastDaySelection,
      updateForcastData: state.updateForecastData,
      updateSelectedWidget: state.updateSelectedWidget,
    }),
    shallow
  );

  async function onSearch(value: string) {
    let searchKeyword = value;
    if (searchKeyword === "") {
      searchKeyword = "Singapore";
    }
    const res = await fetchLocation(searchKeyword, 5);
    const listOptions: IOptions[] = res.map((item: IGeoCodingLocation) => ({
      value: item,
      label: `${item.name} (${Number(item.lat).toFixed(2)}-${Number(item.lon).toFixed(2)})`,
    }));
    if (!selectedLocation && listOptions.length > 0) {
      const location = listOptions[0].value;
      updateSelectedLocation(location);
      getCurrentWeather(location);
      getWeatherForecastNextDays(selectedForecastDayOption.value, location);
    }
    setLocationOptions(listOptions);
    return listOptions;
  }

  const onChangeLocation = useCallback(
    (newValue: SingleValue<IOptions>) => {
      if (newValue) {
        updateSelectedLocation(newValue.value);
        getCurrentWeather(newValue.value);
        getWeatherForecastNextDays(selectedForecastDayOption.value, newValue.value);
      }
    },
    [updateSelectedLocation, getCurrentWeather, getWeatherForecastNextDays, selectedForecastDayOption]
  );

  const onChangeSelectDayForecast = useCallback(
    (
      option: SingleValue<{
        value: number;
        label: string;
      }>
    ) => {
      if (option?.value && selectedLocation) {
        updateForcastDaySelection(option);
        getWeatherForecastNextDays(option.value, selectedLocation).then(updateForcastData);
      }
    },
    [selectedLocation, getWeatherForecastNextDays, updateForcastDaySelection, updateForcastData]
  );

  const handleChangeWidget = useCallback(
    (widget: IWidget) => {
      updateSelectedWidget(widget);
      onChangeLocation({
        value: widget.location,
        label: widget.location.name,
      });
    },
    [onChangeLocation, updateSelectedWidget]
  );

  return {
    onSearch,
    onChangeLocation,
    onChangeSelectDayForecast,
    selectedForecastDayOption,
    locationOptions,
    handleChangeWidget,
    selectedLocation,
  };
}
