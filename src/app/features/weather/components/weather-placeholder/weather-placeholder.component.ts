import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-weather-placeholder',
  standalone: true,
  imports: [],
  templateUrl: './weather-placeholder.component.html',
  styleUrl: './weather-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherPlaceholderComponent {}
