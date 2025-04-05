import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { LoadingOverlayComponent } from './components/shared/loading-overlay/loading-overlay.component';

import { AppService } from './services/app.service';
import { CurrentUserService } from './services/current-user.service';
import { LoadingService } from './services/loading.service';
import { ToasterComponent } from './components/shared/toaster/toaster.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingOverlayComponent, ToasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    private router: Router,
    private loadingService: LoadingService,
  ) {
    this.handleRouteChanges();
  }

  private handleRouteChanges() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loadingService.hide();
      }
    });
  }
}
