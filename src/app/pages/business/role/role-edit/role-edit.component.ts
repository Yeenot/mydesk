import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { FormFieldComponent } from '../../../../components/shared/form-field/form-field.component';

import { AppService } from '../../../../services/app.service';
import { LoadingService } from '../../../../services/loading.service';
import { RoleService } from '../../../../services/api/role.service';
import { ToasterService } from '../../../../services/toaster.service';

import { Role } from '../../../../models/role.model';

@Component({
  selector: 'app-role-edit',
  imports: [CommonModule, FormFieldComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './role-edit.component.html',
  styleUrl: './role-edit.component.css'
})
export class RoleEditComponent {
  private appService = inject(AppService);
  readonly app = this.appService.app;
  readonly businessId = this.appService.businessId;
  
  roleForm!: FormGroup;

  constructor(
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private router: Router,
    private toasterService: ToasterService,
  ) {
    this.setup();
  }

  setup() {
    this.roleForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      is_active: [null, [Validators.required]],
    });
  }

  submit() {
    if (!this.roleForm?.valid) {
      this.toasterService.show('Unable to submit. Please check all required fields and try again.', 'error');
      return;
    }

    const data: Role = this.roleForm?.value;
    this.loadingService.show();
    this.roleService.create(data).subscribe({
      next: response => {
        if (!!response?.data) {
          this.router.navigate(['/businesses/roles']);
        }
        this.loadingService.hide();
      },
      error: _ => {
        this.loadingService.hide();
      }
    });
  }
}
