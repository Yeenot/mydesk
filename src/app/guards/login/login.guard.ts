import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { CurrentUserService } from '../../services/current-user.service';
import { AuthUser } from '../../models/user.model';

export const LoginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const currentUserService = inject(CurrentUserService);

  const user: AuthUser | null = currentUserService.getUser();

  // If there's user, redirect to dashboard
  if (!!user) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
