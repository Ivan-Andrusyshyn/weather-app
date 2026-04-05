export type MainWeatherType =
  | 'temp'
  | 'feels_like'
  | 'temp_min'
  | 'temp_max'
  | 'pressure'
  | 'humidity'
  | 'sea_level'
  | 'grnd_level';

export type WeatherType =
  | 'thunderstorm'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'atmosphere'
  | 'clear'
  | 'clouds';

export type TimeOfDayType = 'morning' | 'day' | 'evening' | 'night';

export interface Weather {
  id: number;
  main: WeatherType;
  description: string;
  icon: string;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherApiResponse {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Record<MainWeatherType, number>;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherModel {
  city: string;
  title: WeatherType;
  weatherType: WeatherType;
  country: string;
  timeOfDay: TimeOfDayType;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  mainWeather: string;
  icon: string;
}
