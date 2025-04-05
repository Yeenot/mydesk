import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-toaster',
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent {
  toastService = inject(ToasterService);
}
