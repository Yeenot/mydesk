import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormGroup } from '@angular/forms';

import { FormFieldErrorService } from '../../../services/form-field-error.service';

import { getValidationMessage } from '../../../utils/validation-error.util';

@Component({
  selector: 'app-form-field',
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css'
})
export class FormFieldComponent {
  @Input() name!: string;

  private container = inject(ControlContainer);
  private errorService = inject(FormFieldErrorService);

  get form(): FormGroup | null {
    return this.container?.control as FormGroup;
  }

  get fieldError(): string | null {
    if (!this.form || !this.name) {
      return null;
    }

    const control = this.form.get(this.name);
    if (control?.touched && control?.invalid && control.errors) {
      return getValidationMessage(control.errors);
    }
  
    return this.errorService.get(this.name);
  }
  
}
