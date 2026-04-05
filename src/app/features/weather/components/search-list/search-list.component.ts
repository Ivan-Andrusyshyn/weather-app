import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Input,
  output,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchListComponent {
  searchList = input.required<string[]>();
  showSearchList = input.required<boolean>();
  selectCity = output<string>();
  clearSearchList = output();

  select(city: string) {
    this.selectCity.emit(city);
  }
}
