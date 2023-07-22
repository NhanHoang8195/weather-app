"use client";

import React from "react";
import SelectForcastDay from "react-select";
import SearchLocation from "../search";
import useHome from "src/modules/home/Home.action";
import { OPTIONS } from "src/constants";

const HomeHeader = () => {
  const { onChangeSelectDayForecast, selectedForecastDayOption: selectedOption } = useHome();
  return (
    <div className="flex flex-wrap gap-1">
      <SearchLocation />
      <div className="w-32">
        <SelectForcastDay value={selectedOption} options={OPTIONS} onChange={onChangeSelectDayForecast} />
      </div>
    </div>
  );
};

export default HomeHeader;
