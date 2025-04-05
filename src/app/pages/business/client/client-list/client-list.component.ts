import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconComponent } from '../../../../components/shared/icon/icon.component';
import { Client, ClientState, ClientStatus, ClientStateLabel } from '../../../../models/client.model';

@Component({
  selector: 'app-business-client-list',
  imports: [CommonModule, IconComponent],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {
  ClientStatus = ClientStatus;
  ClientState = ClientState;
  ClientStateLabel = ClientStateLabel;

  clients: Client[] = [];
}
