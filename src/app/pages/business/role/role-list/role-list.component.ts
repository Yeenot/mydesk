import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../../../components/shared/icon/icon.component';

import { AppService } from '../../../../services/app.service';

import { Role, RoleStatus } from '../../../../models/role.model';
import { RoleService } from '../../../../services/api/role.service';
import { LoadingService } from '../../../../services/loading.service';

@Component({
  selector: 'app-role-list',
  imports: [CommonModule, IconComponent, RouterLink],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent {
  RoleStatus = RoleStatus;

  private appService = inject(AppService);
  readonly app = this.appService.app;
  readonly businessId = this.appService.businessId;
  
  roles: Role[] = [];

  constructor(
    private roleService: RoleService,
    private loadingService: LoadingService,
  ) {}
  
  ngOnInit() {
      this.initialize();
  }

  initialize() {
      this.loadingService.show();
      this.getRoles();
  }

  getRoles() {
    this.roleService.getAll().subscribe({
      next: response => {
        if (!!response?.data) {
          this.roles = response.data;
        }
        this.loadingService.hide();
      }
    })
  }
}
