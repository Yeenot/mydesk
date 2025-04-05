import { computed, Injectable, signal } from '@angular/core';

export interface IAppState {
  business_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly _app = signal<IAppState | null>(null);
  readonly app = this._app.asReadonly();

  readonly businessId = computed(() => this.app()?.business_id ?? null);

  constructor() {
    this.loadAppFromStorage();
  }

  private loadAppFromStorage(): void {
    const stored = localStorage.getItem('app');
    if (stored) {
      this._app.set(JSON.parse(stored));
    }
  }

  setApp(app: IAppState): void {
    this._app.set(app);
    localStorage.setItem('app', JSON.stringify(app));
  }

  getApp(): IAppState | null {
    return this._app();
  }

  clearApp(): void {
    this._app.set(null);
    localStorage.removeItem('app');
  }
}
