import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from '../loading/loading.component';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-loading-overlay',
  imports: [CommonModule, LoadingComponent],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.css',
})
export class LoadingOverlayComponent {
  private loadingService = inject(LoadingService);
  private readonly rawLoading = this.loadingService.isLoading;
  private timer: ReturnType<typeof setTimeout> | null = null;

  readonly isLoading = signal(false);

  constructor() {
    effect(() => {
      const count = this.loadingService.isLoading();

      if (count > 0) {
        this.timer = setTimeout(() => {
          if (this.loadingService.isLoading() > 0) {
            this.isLoading.set(true);
          }
        }, 150);
      } else {
        clearTimeout(this.timer!);
        this.isLoading.set(false);
      }
    });
  }
}
