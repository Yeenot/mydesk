import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth/auth.guard';
import { LoginGuard } from './guards/login/login.guard';
import { RoleGuard } from './guards/role/role.guard';

import { PanelComponent } from './layouts/panel/panel.component';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';

import { UserType } from './models/user.model';

export const routes: Routes = [
  {
    path: '',
    canMatch: [RoleGuard([UserType.Superadmin])],
    canActivate: [AuthGuard],
    component: PanelComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/admin.routing').then((m) => m.routes),
      }
    ]
  },
  {
    path: '',
    canMatch: [RoleGuard([UserType.Business])],
    canActivate: [AuthGuard],
    component: PanelComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/user.routing').then((m) => m.routes),
      }
    ]
  },
  {
    path: 'login', 
    canActivate: [LoginGuard],
    component: LoginComponent,
  },
  {
    path: '404', 
    component: NotFoundComponent,
  },
  {
    path: '',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: '404',
  }
];
