import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../../../components/shared/icon/icon.component';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-admin-sidebar',
  imports: [CommonModule, IconComponent, RouterLink],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  private appService = inject(AppService);
  readonly app = this.appService.app;
  readonly businessId = this.appService.businessId;
}
