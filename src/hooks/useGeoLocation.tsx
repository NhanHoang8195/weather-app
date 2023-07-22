import { useMemo, useState } from "react";
import useSWR from "swr";
import { request } from "src/utils/request";
import { IGeoCodingLocation } from "src/models/Geocoder.model";
import { debounceAsync, generateLocationNameForGeocoding } from "src/utils";
import { E_API } from "src/enums/Api.enum";

interface IGeoLocationHook {
  data: IGeoCodingLocation[];
  isLoading: boolean;
  fetchLocation: (location: string, limit: number) => Promise<IGeoCodingLocation[]>;
}

export default function useGeoLocation(): IGeoLocationHook {
  const [data, setData] = useState([] as IGeoCodingLocation[]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedFetchLocation: () => Promise<IGeoCodingLocation[]> = useMemo(() => {
    async function geoLocation(location: string, limit = 1) {
      setIsLoading(true);
      const res: IGeoCodingLocation[] = await request<IGeoCodingLocation[]>({
        url: E_API.GEOCODING,
        params: { q: generateLocationNameForGeocoding(location), limit },
      });
      setData(res);
      setIsLoading(false);
      return res;
    }
    return debounceAsync(geoLocation, 1000);
  }, []);

  return {
    data,
    isLoading,
    fetchLocation: debouncedFetchLocation,
  };
}
