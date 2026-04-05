import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// ==============
import { WeatherModel } from '../../../types/weather.model';

@Component({
  selector: 'app-forecast-body',
  standalone: true,
  imports: [],
  templateUrl: './forecast-body.component.html',
  styleUrl: './forecast-body.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastBodyComponent {
  temperature = input.required<number>();
  title = input.required<string>();
  iconUrl = input.required<string>();
  description = input.required<string>();
}
