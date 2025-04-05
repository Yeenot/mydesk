import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingCounter = signal(0);

  readonly isLoading = this.loadingCounter.asReadonly();

  show(): void {
    this.loadingCounter.set(this.loadingCounter() + 1);
  }

  hide(): void {
    const count = this.loadingCounter();
    this.loadingCounter.set(count > 0 ? count - 1 : 0);
  }

  reset(): void {
    this.loadingCounter.set(0);
  }
}
