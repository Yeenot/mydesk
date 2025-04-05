import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CurrentUserService } from '../../services/current-user.service';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/api/auth.service';

import { AuthUser } from '../../models/user.model';
import { FormFieldComponent } from '../../components/shared/form-field/form-field.component';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private currentUserService: CurrentUserService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private router: Router,
    private toasterService: ToasterService,
  ) {
    this.setup();
  }

  setup() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (!this.loginForm?.valid) {
      this.toasterService.show('Unable to submit. Please check all required fields and try again.', 'error');
      return;
    }

    const { email, password }: { email: string, password: string }
      = this.loginForm?.value;

    this.loadingService.show();
    this.authService.login(email, password).subscribe({
      next: response => {
        if (!!response?.data) {
          let user = response?.data as AuthUser;

          this.currentUserService.setUser(user)
          this.appService.setApp({ business_id: user.business_id });
          this.router.navigate(['/dashboard']);
        }
        this.loadingService.hide();
      },
      error: _ => {
        this.loadingService.hide();
      }
    });
  }
}
