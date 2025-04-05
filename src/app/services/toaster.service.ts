import { Injectable, signal } from '@angular/core';

export interface ToasterMessage {
  id: number;
  message: string;
  type?: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToasterService {
  private counter = 0;
  toasts = signal<ToasterMessage[]>([]);

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = ++this.counter;
    const newToast: ToasterMessage = { id, message, type };

    this.toasts.update((toasts) => [...toasts, newToast]);

    setTimeout(() => this.remove(id), 3500);
  }

  remove(id: number) {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
