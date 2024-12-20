import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private patientUrl = 'http://localhost:3000/patients/';
  constructor(private http: HttpClient) { }

  updateProfile(userId: number, updatedProfile: any): Observable<any> {
    const updateUrl = `${this.patientUrl}${userId}`;
    return this.http.put(updateUrl, updatedProfile);
  }
}
