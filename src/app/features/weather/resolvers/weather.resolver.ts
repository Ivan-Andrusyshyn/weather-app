import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable, of, switchMap, tap } from 'rxjs';

// ==================
import { WeatherService } from '../services/weather.service';
import { ToastService } from '../../../core/services/toast.service';
import { WeatherModel } from '../types/weather.model';
import { CacheDataService } from '../services/cache-data.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherResolver implements Resolve<any> {
  private weatherService = inject(WeatherService);
  private toastService = inject(ToastService);
  private cacheService = inject(CacheDataService);

  resolve(route: ActivatedRouteSnapshot): Observable<WeatherModel | boolean> {
    const city = route.paramMap.get('city');

    if (!city) {
      this.toastService.error('City param is required');
      return of(false);
    }
    const cached = this.cacheService.getCache(city);

    if (cached) {
      return cached;
    }

    return this.weatherService
      .getWeather(city)
      .pipe(tap((weather) => this.cacheService.setCache(city, weather)));
  }
}
