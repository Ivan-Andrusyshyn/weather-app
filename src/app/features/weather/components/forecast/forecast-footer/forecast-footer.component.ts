import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// =====
import { WeatherModel } from '../../../types/weather.model';

@Component({
  selector: 'app-forecast-footer',
  standalone: true,
  imports: [],
  templateUrl: './forecast-footer.component.html',
  styleUrl: './forecast-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastFooterComponent {
  windSpeed = input.required<number>();
  humidity = input.required<number>();
}
