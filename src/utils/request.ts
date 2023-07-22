import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEATHER_API,
  timeout: 1000,
});

instance.interceptors.request.use(
  function handleReqBeforeSend(config) {
    config.params = {
      appId: process.env.NEXT_PUBLIC_WEATHER_APP_KEY,
      ...config.params,
    };
    return config;
  },
  function onReqError() {}
);

export function request<T>(config: AxiosRequestConfig): Promise<T> {
  return instance
    .request(config)
    .then((res) => res.data as T)
    .catch((error) => {
      return error;
    });
}

export default instance;
