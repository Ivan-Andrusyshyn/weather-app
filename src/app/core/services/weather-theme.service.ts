import { Injectable } from '@angular/core';

// ==============
import { WeatherType } from '../../features/weather/types/weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherThemeService {
  setTheme(weatherType: WeatherType) {
    document.body.classList.remove(
      'theme-thunderstorm',
      'theme-drizzle',
      'theme-rain',
      'theme-snow',
      'theme-atmosphere',
      'theme-clear',
      'theme-clouds',
    );

    document.body.classList.add(`theme-${weatherType}`);
  }
}
