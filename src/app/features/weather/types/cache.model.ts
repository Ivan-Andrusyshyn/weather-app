import { WeatherModel } from './weather.model';

export type CacheEntry = {
  data: WeatherModel;
  time: number;
};
