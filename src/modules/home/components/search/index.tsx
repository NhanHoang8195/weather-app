import React from "react";
import AsyncSelect from "react-select/async";
import useHome from "src/modules/home/Home.action";

const Search = () => {
  const { onSearch, onChangeLocation, locationOptions } = useHome();

  return (
    <div className="max-w-sm md:min-w-[300px]">
      <AsyncSelect
        onChange={onChangeLocation}
        cacheOptions={true}
        defaultOptions={locationOptions}
        loadOptions={onSearch}
        placeholder="Select a city name"
        options={locationOptions}
        defaultInputValue="Singapore"
      />
    </div>
  );
};

export default Search;
