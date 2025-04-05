import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSidebarComponent } from "./admin-sidebar/admin-sidebar.component";
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';

import { AppService } from '../../../services/app.service';
import { CurrentUserService } from '../../../services/current-user.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, AdminSidebarComponent, UserSidebarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private appService = inject(AppService);
  readonly app = this.appService.app;

  private currentUserService = inject(CurrentUserService);
  readonly user = this.currentUserService.user;
  readonly isSuperAdmin = this.currentUserService.isSuperAdmin;
}
