import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, },
  {
    path: '', loadChildren: () =>
      import('./business/business.routing').then((m) => m.routes),
  },
];
