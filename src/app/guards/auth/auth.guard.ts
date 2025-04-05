import {
  CanActivateFn,
  Router,
} from '@angular/router';
import { AuthUser } from '../../models/user.model';
import { inject } from '@angular/core';
import { CurrentUserService } from '../../services/current-user.service';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const currentUserService = inject(CurrentUserService);

  const user: AuthUser | null = currentUserService.getUser();

  // If there's no user, redirect to login
  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
