import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from '../../../services/app.service';
import { BusinessService } from '../../../services/api/business.service';
import { CurrentUserService } from '../../../services/current-user.service';
import { LoadingService } from '../../../services/loading.service';

import { Business } from '../../../models/business.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [CommonModule, FormsModule],
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private appService = inject(AppService);
  readonly app = this.appService.app;
  readonly businessId = this.appService.businessId;

  private currentUserService = inject(CurrentUserService);
  readonly user = this.currentUserService.user;
  readonly isSuperAdmin = this.currentUserService.isSuperAdmin;

  businesses: Business[] = [];

  constructor(
    private businessService: BusinessService,
    private loadingService: LoadingService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.getBusinesses();
  }

  getBusinesses() {
    this.businessService.getAll().subscribe({
      next: response => {
        if (!!response?.data) {
          this.businesses = response.data;
        }
        this.loadingService.hide();
      }
    })
  }

  onActiveBusinessChange(businessId: number): void {
    this.appService.setApp({ business_id: businessId });
    this.router.navigate(['/businesses/profile']);
  }

  logout() {
    this.currentUserService.clearUser();
    this.appService.clearApp();
    this.router.navigate(['/login']);
  }
}
