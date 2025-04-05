import { Routes } from '@angular/router';

// Appointments
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentListComponent } from './appointment/appointment-list/appointment-list.component';
import { AppointmentCreateComponent } from './appointment/appointment-create/appointment-create.component';
import { AppointmentEditComponent } from './appointment/appointment-edit/appointment-edit.component';
import { AppointmentViewComponent } from './appointment/appointment-view/appointment-view.component';

// Clients
import { ClientComponent } from './client/client.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { ClientEditComponent } from './client/client-edit/client-edit.component';
import { ClientViewComponent } from './client/client-view/client-view.component';

// Services
import { ServiceComponent } from './service/service.component';
import { ServiceListComponent } from './service/service-list/service-list.component';
import { ServiceEditComponent } from './service/service-edit/service-edit.component';
import { ServiceViewComponent } from './service/service-view/service-view.component';

// Resources
import { ResourceComponent } from './resource/resource.component';
import { ResourceListComponent } from './resource/resource-list/resource-list.component';
import { ResourceEditComponent } from './resource/resource-edit/resource-edit.component';
import { ResourceViewComponent } from './resource/resource-view/resource-view.component';

// Users
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserViewComponent } from './user/user-view/user-view.component';

// Roles
import { RoleComponent } from './role/role.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleEditComponent } from './role/role-edit/role-edit.component';
import { RoleViewComponent } from './role/role-view/role-view.component';

import { BusinessViewComponent } from './business/business-view/business-view.component';

export const routes: Routes = [
  {
    path: 'appointments', component: AppointmentComponent,
    children: [
      { path: '', component: AppointmentListComponent, pathMatch: 'full' },
      { path: 'create', component: AppointmentCreateComponent },
      { path: ':appointment_id/edit', component: AppointmentEditComponent },
      { path: ':appointment_id', component: AppointmentViewComponent },
    ],
  },
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
    path: 'services', component: ServiceComponent,
    children: [
      { path: '', component: ServiceListComponent, pathMatch: 'full' },
      { path: 'create', component: ServiceEditComponent },
      { path: ':service_id/edit', component: ServiceEditComponent },
      { path: ':service_id', component: ServiceViewComponent },
    ],
  },
  {
    path: 'resources', component: ResourceComponent,
    children: [
      { path: '', component: ResourceListComponent, pathMatch: 'full' },
      { path: 'create', component: ResourceEditComponent },
      { path: ':service_id/edit', component: ResourceEditComponent },
      { path: ':service_id', component: ResourceViewComponent },
    ],
  },
  {
    path: 'users', component: UserComponent,
    children: [
      { path: '', component: UserListComponent, pathMatch: 'full' },
      { path: 'create', component: UserEditComponent },
      { path: ':user_id/edit', component: UserEditComponent },
      { path: ':user_id', component: UserViewComponent },
    ],
  },
  {
    path: 'roles', component: RoleComponent,
    children: [
      { path: '', component: RoleListComponent, pathMatch: 'full' },
      { path: 'create', component: RoleEditComponent },
      { path: ':role_id/edit', component: RoleEditComponent },
      { path: ':role_id', component: RoleViewComponent },
    ],
  },
  { path: 'profile', component: BusinessViewComponent },
];
