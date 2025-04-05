import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { FormFieldComponent } from '../../../../components/shared/form-field/form-field.component';

import { AppService } from '../../../../services/app.service';
import { LoadingService } from '../../../../services/loading.service';
import { ServiceService } from '../../../../services/api/service.service';
import { ToasterService } from '../../../../services/toaster.service';

import { pricePatternValidator } from '../../../../validators/price-pattern.validator';

import { Role } from '../../../../models/role.model';

@Component({
  selector: 'app-service-edit',
  imports: [CommonModule, FormFieldComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './service-edit.component.html',
  styleUrl: './service-edit.component.css'
})
export class ServiceEditComponent {
  private appService = inject(AppService);
  readonly app = this.appService.app;
  readonly businessId = this.appService.businessId;
  
  serviceForm!: FormGroup;

  constructor(
    private serviceService: ServiceService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private router: Router,
    private toasterService: ToasterService,
  ) {
    this.setup();
  }

  setup() {
    this.serviceForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0.00, [
        Validators.required,
        Validators.min(0),
        pricePatternValidator(),
      ]],
      is_active: [null, [Validators.required]],
    });
  }

  submit() {
    if (!this.serviceForm?.valid) {
      this.toasterService.show('Unable to submit. Please check all required fields and try again.', 'error');
      return;
    }

    const data: Role = this.serviceForm?.value;
    this.loadingService.show();
    this.serviceService.create(data).subscribe({
      next: response => {
        if (!!response?.data) {
          this.router.navigate(['/businesses/services']);
        }
        this.loadingService.hide();
      },
      error: _ => {
        this.loadingService.hide();
      }
    });
  }
}
