import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppService } from '../services/app.service';

@Injectable()
export class BusinessInterceptor implements HttpInterceptor {
  constructor(private appService: AppService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const appState = this.appService.getApp();

    if (appState?.business_id) {
      const modifiedReq = req.clone({
        setHeaders: {
          'X-Business-Id': appState.business_id.toString()
        }
      });
      return next.handle(modifiedReq);
    }

    return next.handle(req);
  }
}
