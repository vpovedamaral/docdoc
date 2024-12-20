import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  login() {
    this.authService.loginPatient(this.loginForm.value).subscribe((user: any) => {
      if (user.length === 0) alert('You entered an incorrect username or password');
      this.authService.user = user[0];
      if (!this.authService.user) return;
      this.authService.savePatient();
      this.router.navigate(['/home']);
    }, () => {
      alert('Erreur dans la requête');
    });
  }
}
