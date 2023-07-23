"use client";

import React, { useMemo } from "react";
import Chart from "src/components/chart/Chart";
import useHomeStore, { IHomeStore } from "src/zustand-store/Home.store";
import DateForecast from "../date-forecast/DateForecast";
import { formatXaxisLineChart } from "src/utils";
import { IGeoCodingLocation } from "src/models/Geocoder.model";
import { IWidget } from "src/models/Wiget.model";

const ChartCurrentDate = () => {
  const { forecastData, widgets, selectedLocation, updateWidget, currentWeather } = useHomeStore(
    (state: IHomeStore) => ({
      forecastData: state.forecast,
      widgets: state.widgets,
      selectedLocation: state.selectedLocation,
      updateWidget: state.updateWidget,
      currentWeather: state.currentWeather,
    })
  );
  const formatData = useMemo(() => {
    return formatXaxisLineChart(forecastData);
  }, [forecastData]);
  function onAddWidget() {
    if (selectedLocation && currentWeather) {
      updateWidget({
        location: selectedLocation,
        weather: currentWeather,
      });
    }
  }
  const isShowWidget = useMemo(() => {
    if (!selectedLocation) {
      return false;
    }
    return widgets.every(
      (item) => item.location.lat !== selectedLocation.lat && item.location.lon !== selectedLocation.lon
    );
  }, [selectedLocation, widgets]);

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-4 mt-4 min-h-[400px]">
      <Chart
        title={`Hourly forecast ${selectedLocation ? `at ${selectedLocation.name}` : ""}`}
        className="lg:basis-3/4 basis-[100%] p-4 rounded-lg"
        labels={formatData.xAxis}
        datasets={[
          {
            data: formatData.yAxis,
            borderColor: "#0096FF",
          },
        ]}
        showAddWiget={isShowWidget}
        onAddWidget={onAddWidget}
      />
      <DateForecast className={"lg:basis-1/4 basis-[100%] p-4 rounded-lg"} />
    </div>
  );
};

export default ChartCurrentDate;
