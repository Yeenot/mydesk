import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../../../components/shared/icon/icon.component';

import { LoadingService } from '../../../../services/loading.service';
import { BusinessService } from '../../../../services/api/business.service';

import { BusinessStatus, Business, BusinessCountry } from '../../../../models/business.model';
import { getEnumLabelByValue } from '../../../../utils/enum-label-by-value.util';

@Component({
  selector: 'app-business-list',
  imports: [CommonModule, IconComponent, RouterLink],
  templateUrl: './business-list.component.html',
  styleUrl: './business-list.component.css'
})
export class BusinessListComponent {
  BusinessStatus = BusinessStatus
  businesses: Business[] = [];

  constructor(
    private businessService: BusinessService,
    private loadingService: LoadingService,
  ) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
      this.loadingService.show();
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

  getCountryNameByCode(code: string) {
    return getEnumLabelByValue(BusinessCountry, code);
  }
}
