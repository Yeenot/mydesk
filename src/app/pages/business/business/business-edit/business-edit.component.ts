import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { FormFieldComponent } from '../../../../components/shared/form-field/form-field.component';
import { LoadingService } from '../../../../services/loading.service';
import { BusinessService } from '../../../../services/api/business.service';
import { ToasterService } from '../../../../services/toaster.service';

import { BusinessIndustry, BusinessCountry, Business } from '../../../../models/business.model';

type BusinessIndustryOptions = {
  label: string,
  value: string,
}

type CountryOptions = {
  label: string,
  value: string,
}

@Component({
  selector: 'app-business-edit',
  imports: [CommonModule, FormFieldComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './business-edit.component.html',
  styleUrl: './business-edit.component.css'
})
export class BusinessEditComponent {
  businessForm!: FormGroup;

  // Industries
  industries: BusinessIndustryOptions[] = Object.entries(BusinessIndustry).map(
    ([label, value]: [string, string]) => ({
      label,
      value,
    })
  );
  
  // Countries
  countries: CountryOptions[] = Object.entries(BusinessCountry).map(
    ([label, value]: [string, string]) => ({
      label,
      value,
    })
  );

  constructor(
    private businessService: BusinessService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private router: Router,
    private toasterService: ToasterService,
  ) {
    this.setup();
  }

  setup() {
    this.businessForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      bio: [''],
      industry: [null, [Validators.required]],
      country: [null, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      is_active: [null, [Validators.required]],
    });
  }

  submit() {
    if (!this.businessForm?.valid) {
      this.toasterService.show('Unable to submit. Please check all required fields and try again.', 'error');
      return;
    }

    const data: Business = this.businessForm?.value;
    this.loadingService.show();
    this.businessService.create(data).subscribe({
      next: response => {
        if (!!response?.data) {
          this.router.navigate(['/businesses']);
        }
        this.loadingService.hide();
      },
      error: _ => {
        this.loadingService.hide();
      }
    });
  }
}
