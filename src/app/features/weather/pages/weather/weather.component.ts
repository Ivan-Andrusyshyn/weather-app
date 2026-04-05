import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

// ===============
import { SearchFormComponent } from '../../components/search-form/search-form.component';
import { FormErrorsComponent } from '../../components/form-errors/form-errors.component';
import { CacheDataService } from '../../services/cache-data.service';
import { SearchListComponent } from '../../components/search-list/search-list.component';
import { ErrorMessageTypes } from '../../types/form.model';
import { WeatherPlaceholderComponent } from '../../components/weather-placeholder/weather-placeholder.component';

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.component.html',
  imports: [
    RouterOutlet,
    FormErrorsComponent,
    SearchFormComponent,
    SearchFormComponent,
    SearchListComponent,
    WeatherPlaceholderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent implements OnDestroy {
  private router = inject(Router);

  private cacheService = inject(CacheDataService);

  isSubmitted = false;
  timer: null | number = null;

  //
  searchForm: FormGroup = new FormGroup({
    city: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ' -]+$/),
      ],
    }),
  });
  readonly cityErrorMessages: Record<ErrorMessageTypes, string> = {
    required: 'Please enter a city name',
    minlength: 'City name must be at least 3 characters long',
    maxlength: 'City name must be at most 50 characters long',
    pattern:
      'City name can only contain letters, spaces, apostrophes or hyphens',
  };

  //
  searchList = this.cacheService.searchList;
  showSearchList = signal(false);

  //
  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  clearSearchList() {
    this.cacheService.clearCache();
    this.router.navigate(['weather']);
  }
  //
  onFocus() {
    this.showSearchList.set(true);
  }
  onBlur() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => this.showSearchList.set(false), 150);
  }
  selectCity(city: string) {
    this.searchForm.patchValue({ city });
    this.searchForm.controls['city'].markAsDirty();
    this.searchForm.controls['city'].markAsTouched();
    this.onSubmit();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.searchForm.invalid) return;

    const city = this.searchForm.value.city.toLowerCase();

    this.router.navigate(['weather', 'forecast', city]);
    this.searchForm.reset();
    this.isSubmitted = false;
    const activeEl = window.document.activeElement as HTMLElement;
    if (activeEl && typeof activeEl.blur === 'function') activeEl.blur();
    this.showSearchList.set(false);
  }
}
