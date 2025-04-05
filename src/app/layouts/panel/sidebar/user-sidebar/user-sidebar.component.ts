import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../../../components/shared/icon/icon.component';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-user-sidebar',
  imports: [CommonModule, IconComponent, RouterLink],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent {
  private appService = inject(AppService);
  readonly app = this.appService.app;
  readonly businessId = this.appService.businessId;
}
