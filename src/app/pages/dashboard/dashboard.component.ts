import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.loadingService.show();

    setTimeout(() => {
      this.loadingService.hide();
    }, 3000);
  }
}
