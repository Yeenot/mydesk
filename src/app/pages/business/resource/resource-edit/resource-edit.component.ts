import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { FormFieldComponent } from '../../../../components/shared/form-field/form-field.component';

import { AppService } from '../../../../services/app.service';
import { LoadingService } from '../../../../services/loading.service';
import { ResourceService } from '../../../../services/api/resource.service';
import { ToasterService } from '../../../../services/toaster.service';

import { Role } from '../../../../models/role.model';

import { pricePatternValidator } from '../../../../validators/price-pattern.validator';

@Component({
  selector: 'app-resource-edit',
  imports: [CommonModule, FormFieldComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './resource-edit.component.html',
  styleUrl: './resource-edit.component.css'
})
export class ResourceEditComponent {
  private appService = inject(AppService);
  readonly app = this.appService.app;
  readonly businessId = this.appService.businessId;
  
  resourceForm!: FormGroup;

  constructor(
    private resourceService: ResourceService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private router: Router,
    private toasterService: ToasterService,
  ) {
    this.setup();
  }

  setup() {
    this.resourceForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0.00, [
        Validators.required,
        Validators.min(0),
        pricePatternValidator(),
      ]],
    });
  }

  submit() {
    if (!this.resourceForm?.valid) {
      this.toasterService.show('Unable to submit. Please check all required fields and try again.', 'error');
      return;
    }

    const data: Role = this.resourceForm?.value;
    this.loadingService.show();
    this.resourceService.create(data).subscribe({
      next: response => {
        if (!!response?.data) {
          this.router.navigate(['/businesses/resources']);
        }
        this.loadingService.hide();
      },
      error: _ => {
        this.loadingService.hide();
      }
    });
  }
}
