import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../../../components/shared/icon/icon.component';

import { AppService } from '../../../../services/app.service';
import { ResourceService } from '../../../../services/api/resource.service';
import { LoadingService } from '../../../../services/loading.service';

import { Resource } from '../../../../models/resource.model';

@Component({
  selector: 'app-resource-list',
  imports: [CommonModule, IconComponent, RouterLink],
  templateUrl: './resource-list.component.html',
  styleUrl: './resource-list.component.css'
})
export class ResourceListComponent {
  private appService = inject(AppService);
  readonly app = this.appService.app;
  readonly businessId = this.appService.businessId;
  
  resources: Resource[] = [];

  constructor(
    private resourceService: ResourceService,
    private loadingService: LoadingService,
  ) {}
  
  ngOnInit() {
      this.initialize();
  }

  initialize() {
      this.loadingService.show();
      this.getResources();
  }

  getResources() {
    this.resourceService.getAll().subscribe({
      next: response => {
        if (!!response?.data) {
          this.resources = response.data;
        }
        this.loadingService.hide();
      }
    })
  }
}
