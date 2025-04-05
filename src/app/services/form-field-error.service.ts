import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormFieldErrorService {
  private errors = signal<Record<string, string>>({});

  setErrors(errors: Record<string, string>) {
    this.errors.set(errors);
  }

  get(field: string): string | null {
    return this.errors()[field] || null;
  }

  clear() {
    this.errors.set({});
  }
}