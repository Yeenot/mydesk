import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../../../components/shared/icon/icon.component';

import { AppService } from '../../../../services/app.service';
import { LoadingService } from '../../../../services/loading.service';
import { UserService } from '../../../../services/api/user.service';

import { BusinessUser, UserStatus } from '../../../../models/user.model';


@Component({
  selector: 'app-user-list',
  imports: [CommonModule, IconComponent, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  UserStatus = UserStatus;

  private appService = inject(AppService);
  readonly app = this.appService.app;
  readonly businessId = this.appService.businessId;

  users: BusinessUser[] = [];

  constructor(
    private userService: UserService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
      this.initialize();
  }

  initialize() {
      this.loadingService.show();
      this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe({
      next: response => {
        if (!!response?.data) {
          this.users = response.data;
        }
        this.loadingService.hide();
      }
    })
  }
}
