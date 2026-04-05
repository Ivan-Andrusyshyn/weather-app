import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _notifications = signal<Toast[]>([]);
  notifications = this._notifications.asReadonly();

  private idCounter = 0;

  show(message: string, type: ToastType = 'info', duration = 3000) {
    const id = ++this.idCounter;

    this._notifications.update((list) => [
      ...list,
      { id, message, type, duration },
    ]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    this.show(message, 'error', duration);
  }

  info(message: string, duration?: number) {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  }

  remove(id: number) {
    this._notifications.update((list) => list.filter((n) => n.id !== id));
  }

  clear() {
    this._notifications.set([]);
  }
}
