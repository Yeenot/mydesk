import { computed, Injectable, signal } from '@angular/core';
import { AuthUser, UserType } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private readonly _user = signal<AuthUser | null>(null);
  readonly user = this._user.asReadonly();

  readonly isSuperAdmin = computed(() => {
    return this._user()?.user_type === UserType.Superadmin;
  });

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this._user.set(JSON.parse(storedUser));
    }
  }

  setUser(user: AuthUser): void {
    this._user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUser(): void {
    this._user.set(null);
    localStorage.removeItem('user');
  }

  getUser(): AuthUser | null {
    return this._user();
  }
}
