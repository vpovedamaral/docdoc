import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { chiffresSeulsValidator, emailValidator, noSpecialCharsValidator, passwordMatchValidator } from '../validators/validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    
   }
   ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required,emailValidator()]),
      name: new FormControl('', [Validators.required,noSpecialCharsValidator()]),
      birthdate:new FormControl('',Validators.required),
      phone:new FormControl('', [Validators.required, chiffresSeulsValidator()]),
      address:new FormControl('',[Validators.required,noSpecialCharsValidator()]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    }, { validator: passwordMatchValidator() });
  }

  addUser() {
    if (this.registerForm.invalid) return;
    this.authService.addPatient({
      email: this.registerForm.value.email,
      name:this.registerForm.value.name,
      address:this.registerForm.value.address,
      birthdate:this.registerForm.value.birthdate,
      phone:this.registerForm.value.phone,
      password: this.registerForm.value.password
    });
    this.router.navigate(['/login']);
  }

}
