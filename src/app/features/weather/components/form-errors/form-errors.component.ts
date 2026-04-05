import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

// =============
import { ErrorMessageTypes } from '../../types/form.model';

@Component({
  selector: 'app-form-errors',
  standalone: true,
  imports: [],
  templateUrl: './form-errors.component.html',
  styleUrl: './form-errors.component.scss',
})
export class FormErrorsComponent {
  control = input.required<AbstractControl>();
  isSubmitted = input.required<boolean>();
  cityErrorMessages = input.required<Record<ErrorMessageTypes, string>>();

  get shouldShowError() {
    const control = this.control();
    return (control.touched && control.dirty) || this.isSubmitted();
  }
}
