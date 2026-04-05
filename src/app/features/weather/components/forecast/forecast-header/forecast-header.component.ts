import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// =========
import { TimeOfDayType } from '../../../types/weather.model';

@Component({
  selector: 'app-forecast-header',
  standalone: true,
  imports: [],
  templateUrl: './forecast-header.component.html',
  styleUrl: './forecast-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastHeaderComponent {
  city = input.required<string>();
  country = input.required<string>();
  timeOfDay = input.required<TimeOfDayType>();
}
