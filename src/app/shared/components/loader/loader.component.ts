import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// ============
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  private loaderService = inject(LoaderService);

  loader = this.loaderService.loading;
}
