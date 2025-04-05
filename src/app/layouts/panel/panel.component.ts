import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-panel',
  imports: [
    RouterModule,
    HeaderComponent,
    SidebarComponent,
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {

}
