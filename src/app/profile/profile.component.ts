import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {  FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { CommonModule } from '@angular/common';
import { emailValidator, noSpecialCharsValidator } from '../validators/validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule]
})
export default class ProfileComponent implements OnInit {
  myProfil: any;
  userForm: FormGroup | null = null;

  constructor
  (
    private authService: AuthService,
    private _formBuilder: FormBuilder,
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef,
    private router: Router
    ) {}

  ngOnInit() {
    this.authService.getSavedPatientInfo().subscribe((data:any)=> {
      this.myProfil = data[0];
      this.initForm();
    });
 
  }

  initForm() {
    this.userForm = this._formBuilder.group({
      id: [this.myProfil.id, Validators.required],
      name: [this.myProfil.name, Validators.required],
      email: [this.myProfil.email, [Validators.required,emailValidator()]],
      password: [this.myProfil.password, Validators.required],
      birthdate: [this.myProfil.birthdate, Validators.required],
      phone: [this.myProfil.phone, Validators.required],
      address: [this.myProfil.address, [Validators.required,noSpecialCharsValidator()]],
    });
  }

  onSubmit() {
    this.profileService.updateProfile(this.myProfil.id, this.userForm?.value).subscribe({
      next: (response) => {
        console.log('Profil mis à jour avec succès:', response);
        alert("Your profile has been successfully updated")
        this.userForm?.patchValue(response);
        this.cdr.detectChanges();
      },
      error: (err) => {console.log('Erreur',err)}
    });
  }

  cancelProfile() {
    this.router.navigate(['/home']);
  }
}
