import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { RoleGuard } from './role.guard';
import { UserType } from '../../models/user.model';

describe('roleGuard', () => {
  const executeGuard = (allowedRoles: UserType[]): boolean =>
    TestBed.runInInjectionContext(() => RoleGuard(allowedRoles)());

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
