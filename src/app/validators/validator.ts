import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noSpecialCharsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
    
      return null;
    }

    const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    const hasSpecialChars = regex.test(control.value);

    return hasSpecialChars ? { 'specialChars': true } : null;
  };
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(control.value);

    return isValid ? null : { invalidEmail: true };
  };
}

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  };
}

export function chiffresSeulsValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const estChiffresSeuls = /^\d+$/.test(control.value);
    return estChiffresSeuls ? null : { 'chiffresSeuls': true };
  };
}

