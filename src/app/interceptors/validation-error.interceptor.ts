import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { FormFieldErrorService } from '../services/form-field-error.service';
import { catchError, throwError } from 'rxjs';
import { ToasterService } from '../services/toaster.service';

@Injectable()
export class ValidationErrorInterceptor implements HttpInterceptor {
  constructor(
    private formFieldErrorService: FormFieldErrorService,
    private toasterService: ToasterService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.formFieldErrorService.clear();

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error.status === 400 &&
          error.error?.data &&
          typeof error.error.data === 'object'
        ) {
          const validationErrors = error.error.data;
          const mapped: Record<string, string> = {};

          for (const [field, value] of Object.entries(validationErrors)) {
            if (
              typeof value === 'object' &&
              value !== null &&
              'message' in value
            ) {
              mapped[field] = (value as any).message || 'Invalid input';
            }
          }

          this.formFieldErrorService.setErrors(mapped);
        } else if (typeof error.error?.message === 'string') {
          const parts = error.error.message.split(':');
          const message = parts.length > 1 ? parts[1].trim() : error.error.message;
          this.toasterService.show(message, 'error');
        }

        return throwError(() => error);
      })
    );
  }
}
