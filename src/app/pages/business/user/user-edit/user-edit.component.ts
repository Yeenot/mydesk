import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { FormFieldComponent } from '../../../../components/shared/form-field/form-field.component';

import { AppService } from '../../../../services/app.service';
import { LoadingService } from '../../../../services/loading.service';
import { ToasterService } from '../../../../services/toaster.service';
import { UserService } from '../../../../services/api/user.service';

import { Role } from '../../../../models/role.model';
import { RoleService } from '../../../../services/api/role.service';

@Component({
  selector: 'app-user-edit',
  imports: [CommonModule, FormFieldComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  private appService = inject(AppService);
  readonly app = this.appService.app;
  readonly businessId = this.appService.businessId;
  
  userForm!: FormGroup;

  roles: Role[] = [];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private roleService: RoleService,
    private router: Router,
    private toasterService: ToasterService,
  ) {
    this.setup();
  }

  setup() {
    this.userForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role_id: [null, [Validators.required]],
      is_active: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.getRoles();
  }

  getRoles() {
    this.roleService.getAll().subscribe({
      next: response => {
        if (!!response?.data) {
          this.roles = response.data;
        }
      }
    })
  }

  submit() {
    if (!this.userForm?.valid) {
      this.toasterService.show('Unable to submit. Please check all required fields and try again.', 'error');
      return;
    }

    const data: Role = this.userForm?.value;
    this.loadingService.show();
    this.userService.create(data).subscribe({
      next: response => {
        if (!!response?.data) {
          this.router.navigate(['/businesses/users']);
        }
        this.loadingService.hide();
      },
      error: _ => {
        this.loadingService.hide();
      }
    });
  }
}
