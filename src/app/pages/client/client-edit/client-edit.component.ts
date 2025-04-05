import { Component, inject } from '@angular/core';
import { Client } from '../../../models/client.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { FormFieldComponent } from '../../../components/shared/form-field/form-field.component';

import { AppService } from '../../../services/app.service';
import { ClientService } from '../../../services/api/client.service';
import { LoadingService } from '../../../services/loading.service';
import { ToasterService } from '../../../services/toaster.service';

import { Role } from '../../../models/role.model';


@Component({
  selector: 'app-client-edit',
  imports: [CommonModule, FormFieldComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.css'
})
export class ClientEditComponent {
  private appService = inject(AppService);
  readonly app = this.appService.app;
  readonly businessId = this.appService.businessId;
  
  clientForm!: FormGroup;

  clients: Client[] = [];

  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private router: Router,
    private toasterService: ToasterService,
  ) {
    this.setup();
  }

  setup() {
    this.clientForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      is_active: [null, [Validators.required]],
    });
  }

  submit() {
    if (!this.clientForm?.valid) {
      this.toasterService.show('Unable to submit. Please check all required fields and try again.', 'error');
      return;
    }

    const data: Role = this.clientForm?.value;
    this.loadingService.show();
    this.clientService.create(data).subscribe({
      next: response => {
        if (!!response?.data) {
          this.router.navigate(['/clients']);
        }
        this.loadingService.hide();
      },
      error: _ => {
        this.loadingService.hide();
      }
    });
  }
}
