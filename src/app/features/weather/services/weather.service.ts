import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

// ======================
import {
  TimeOfDayType,
  WeatherApiResponse,
  WeatherModel,
  WeatherType,
} from '../types/weather.model';
import { env } from '../../../core/env/env';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  //usually i hide api key on server in .env
  private readonly API_KEY = env.API_KEY;
  private readonly API_URL = env.API_URL + '/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<WeatherModel> {
    return this.http
      .get<WeatherApiResponse>(
        `${this.API_URL}?q=${city}&appid=${this.API_KEY}&units=metric`,
      )
      .pipe(map((data) => this.mapWeather(data)));
  }

  private calculateTimeOfDay(data: WeatherApiResponse): TimeOfDayType {
    const localTime = new Date((data.dt + data.timezone) * 1000);
    const hours = localTime.getUTCHours();

    if (hours >= 5 && hours < 10) return 'morning';
    if (hours >= 10 && hours < 18) return 'day';
    if (hours >= 18 && hours < 21) return 'evening';
    return 'night';
  }

  private mapWeather(data: WeatherApiResponse): WeatherModel {
    return {
      city: data.name,
      timeOfDay: this.calculateTimeOfDay(data),
      weatherType: data.weather[0].main.toLowerCase() as WeatherType,
      title: data.weather[0].main,
      country: data.sys.country,
      temperature: parseInt(data.main.temp.toString(), 10),
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      mainWeather: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };
  }
}
