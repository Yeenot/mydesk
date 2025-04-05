import { Routes } from '@angular/router';
import { inject } from '@angular/core';

import { CurrentUserService } from './services/current-user.service';

import { UserType } from './models/user.model';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => {
      const currentUserService = inject(CurrentUserService);
      const user = currentUserService.getUser();
      if (user?.user_type === UserType.Superadmin) {
        return import('./pages/admin.routing').then((m) => m.routes);
      } else {
        return import('./pages/user.routing').then((m) => m.routes);
      }
    },
  },
];
