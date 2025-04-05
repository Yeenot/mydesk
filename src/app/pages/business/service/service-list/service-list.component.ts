import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../../components/shared/icon/icon.component';

import { AppService } from '../../../../services/app.service';
import { LoadingService } from '../../../../services/loading.service';

import { Service, ServiceStatus } from '../../../../models/service.model';
import { ServiceService } from '../../../../services/api/service.service';

@Component({
  selector: 'app-service-list',
  imports: [CommonModule, IconComponent, RouterLink],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css'
})
export class ServiceListComponent {
  ServiceStatus = ServiceStatus;

  private appService = inject(AppService);
  readonly app = this.appService.app;
  readonly businessId = this.appService.businessId;
  
  services: Service[] = [];

  constructor(
    private serviceService: ServiceService,
    private loadingService: LoadingService,
  ) {}
  
  ngOnInit() {
      this.initialize();
  }

  initialize() {
      this.loadingService.show();
      this.getServices();
  }

  getServices() {
    this.serviceService.getAll().subscribe({
      next: response => {
        if (!!response?.data) {
          this.services = response.data;
        }
        this.loadingService.hide();
      }
    })
  }
}
