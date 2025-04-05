import { inject } from '@angular/core';

import { CurrentUserService } from '../../services/current-user.service';

import { UserType } from '../../models/user.model';

export const RoleGuard = (allowedRoles: UserType[]) => {
  return () => {
    const user = inject(CurrentUserService).getUser();
    return allowedRoles.includes(user?.user_type as UserType);
  };
};
