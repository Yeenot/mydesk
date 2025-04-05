import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../../components/shared/icon/icon.component';

import { AppService } from '../../../services/app.service';
import { ClientService } from '../../../services/api/client.service';
import { LoadingService } from '../../../services/loading.service';

import { Client, ClientState, ClientStatus, ClientStateLabel } from '../../../models/client.model';

@Component({
  selector: 'app-business-client-list',
  imports: [CommonModule, IconComponent, RouterLink],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {
  ClientStatus = ClientStatus;
  ClientState = ClientState;
  ClientStateLabel = ClientStateLabel;


  private appService = inject(AppService);
  readonly app = this.appService.app;
  readonly businessId = this.appService.businessId;

  clients: Client[] = [];

  constructor(
    private clientService: ClientService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
      this.initialize();
  }

  initialize() {
      this.loadingService.show();
      this.getClients();
  }

  getClients() {
    this.clientService.getAll().subscribe({
      next: response => {
        if (!!response?.data) {
          this.clients = response.data;
        }
        this.loadingService.hide();
      }
    })
  }
}
