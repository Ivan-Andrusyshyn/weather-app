import { Routes } from '@angular/router';

// ==================
import { WeatherResolver } from './features/weather/resolvers/weather.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
  {
    path: 'weather',
    loadComponent: () =>
      import('./features/weather/pages/weather/weather.component').then(
        (m) => m.WeatherComponent,
      ),
    children: [
      {
        path: 'forecast/:city',
        loadComponent: () =>
          import('./features/weather/pages/forecast/forecast.component').then(
            (c) => c.ForecastComponent,
          ),
        resolve: { weather: WeatherResolver },
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
