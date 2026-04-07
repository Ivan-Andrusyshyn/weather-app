import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

// ====================
import { TimeOfDayType, WeatherModel } from '../../types/weather.model';
import { env } from '../../../../core/env/env';
import { WeatherThemeService } from '../../../../core/services/weather-theme.service';
import { ForecastHeaderComponent } from '../../components/forecast/forecast-header/forecast-header.component';
import { ForecastBodyComponent } from '../../components/forecast/forecast-body/forecast-body.component';
import { ForecastFooterComponent } from '../../components/forecast/forecast-footer/forecast-footer.component';
import { fadeAnimation } from '../../../../shared/animations/fade.animation';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [
    NgStyle,
    ForecastHeaderComponent,
    ForecastBodyComponent,
    ForecastFooterComponent,
  ],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
})
export class ForecastComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private themeService = inject(WeatherThemeService);

  readonly apiUrl = env.API_URL;

  readonly weather = toSignal<WeatherModel | null>(
    this.route.data.pipe(
      map((data) => {
        const weatherData = data['weather'] as WeatherModel;
        this.themeService.setTheme(weatherData.weatherType);
        return weatherData;
      }),
    ),
    { initialValue: null },
  );
  readonly textColorMap: Record<string, string> = {
    day: 'text-gray-900',
    morning: 'text-gray-800',
    night: 'text-gray-200',
    evening: 'text-gray-200',
  };

  ngOnInit(): void {
    console.log(this.weather());
  }

  getBgImg(type: TimeOfDayType): string {
    return 'assets/images/weather/bg-' + type + '.png';
  }
  getWeatherIcon(icon: string): string {
    return 'https://openweathermap.org/img/wn/' + icon + '@4x.png';
  }
}
