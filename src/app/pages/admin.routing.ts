import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

// Clients
import { ClientComponent } from './client/client.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { ClientEditComponent } from './client/client-edit/client-edit.component';
import { ClientViewComponent } from './client/client-view/client-view.component';

// Businesses
import { BusinessComponent } from './business/business/business.component';
import { BusinessListComponent } from './business/business/business-list/business-list.component';
import { BusinessEditComponent } from './business/business/business-edit/business-edit.component';
import { BusinessViewComponent } from './business/business/business-view/business-view.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, },
  {
      path: 'clients', component: ClientComponent,
      children: [
        { path: '', component: ClientListComponent, pathMatch: 'full' },
        { path: 'create', component: ClientEditComponent },
        { path: ':client_id/edit', component: ClientEditComponent },
        { path: ':client_id', component: ClientViewComponent },
      ],
    },
  {
    path: 'businesses', component: BusinessComponent,
    children: [
      { path: '', component: BusinessListComponent, pathMatch: 'full' },
      { path: 'create', component: BusinessEditComponent },
      { path: 'edit', component: BusinessEditComponent },
      {
        path: '', loadChildren: () =>
          import('./business/business.routing').then((m) => m.routes),
      },
    ],
  },
];
