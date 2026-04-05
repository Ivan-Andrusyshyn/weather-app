import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';

// =======================
import { WeatherModel } from '../types/weather.model';

@Injectable({ providedIn: 'root' })
export class CacheDataService {
  private cache = new Map<string, { data: any; time: number }>();
  private readonly CACHE_TIME = 10 * 60 * 1000;

  searchListSignal = signal<string[]>([]);
  searchList = this.searchListSignal.asReadonly();

  getKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  clearCache() {
    this.searchListSignal.set([]);
    this.cache.clear();
  }

  getCache(key: string) {
    const cached = this.cache.get(key);

    if (cached && Date.now() - cached.time < this.CACHE_TIME) {
      return of(cached.data);
    }
    return null;
  }

  setCache(key: string, data: WeatherModel) {
    this.cache.set(key, {
      data,
      time: Date.now(),
    });

    this.searchListSignal.set(this.getKeys());
  }
}
