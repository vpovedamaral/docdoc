import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Patient } from '../interfaces/patient';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: { id: number; email: string; } | undefined;

  constructor(private http: HttpClient) { }

  loginPatient(user: { email: string; password: string; }) {
    return this.http.get('http://localhost:3000/patients?email=' + user.email + '&password=' + user.password);
  }

  addPatient(user:Patient) {
    return this.http.post('http://localhost:3000/patients', user).subscribe();
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('user');
  }

  savePatient() {
    localStorage.setItem('user', '' + this.user?.id);
  }

  getSavedPatient() {
    return localStorage.getItem('user');
  }


  isUserConnected() {
    if (this.user) {
      this.savePatient();
      return true;
    } else if (this.getSavedPatient()) {
      this.getSavedPatientInfo().subscribe((user: any) => {
        this.user = user[0];
        return true;
      });
    }
    return false;
  }

  public getSavedPatientInfo() {
    return this.http.get('http://localhost:3000/patients?id=' + this.getSavedPatient());
  }

}
