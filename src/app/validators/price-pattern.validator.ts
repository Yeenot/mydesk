import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function pricePatternValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value == null || value === '') {
      return null;
    }

    const isValid = /^\d+(\.\d{1,2})?$/.test(value);
    return isValid
      ? null
      : { price: true };
  };
}
