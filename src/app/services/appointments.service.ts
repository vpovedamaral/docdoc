import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Appointment } from '../interfaces/appointment';
import { Doctor } from '../interfaces/doctor';




@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {


  constructor(private http: HttpClient) { }
  private appointmentsUrl = 'http://localhost:3000/appointments';

  getAvailableAppointmentsWithDoctorInfo(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.appointmentsUrl}`).pipe(
      switchMap((appointments: Appointment[]) => {
        const observables = appointments.map(appointment =>
          this.getDoctorInfo(appointment.doctorId).pipe(
            map(doctor => ({
              ...appointment,
              doctor,
            }))
          )
        );
        return forkJoin(observables);
      }),
      map((appointmentsWithDoctor: Appointment[]) =>
        appointmentsWithDoctor.filter(appointment => appointment.available === true && new Date(appointment.date) > new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      )
    );
  }

   getDoctorInfo(doctorId: number): Observable<Doctor> {
    return this.http.get<Doctor>(`http://localhost:3000/doctors/${doctorId}`);
  }

  getMyAppointments(patientId: number): Observable<any[]> {
    const patientAppointmentsUrl = `${this.appointmentsUrl}?patientId=${patientId}`;

    return this.http.get<Appointment[]>(patientAppointmentsUrl).pipe(
      switchMap((appointments: Appointment[]) => {
        const currentDate = new Date();

        // Sort appointments based on date
        appointments.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();

          if (dateA < currentDate.getTime() && dateB < currentDate.getTime()) {
            // Both dates are in the past, sort in descending order
            return dateB - dateA;
          } else if (dateA < currentDate.getTime()) {
            return 1; // dateA is in the past, move it to the end
          } else if (dateB < currentDate.getTime()) {
            return -1; // dateB is in the past, move it to the end
          } else {
            return dateA - dateB; // Dates are in the future, sort in ascending order
          }
        });

        const observables = appointments.map(appointment =>
          this.getDoctorInfo(appointment.doctorId).pipe(
            map(doctor => ({
              ...appointment,
              doctor,
            }))
          )
        );

        return forkJoin(observables);
      })
    );
  }

  userTakeAppointments(appointment:Appointment,patientId:number){
    const updatedAppointment: Appointment = {
      ...appointment,
      available: false,
      patientId:patientId
    };

    return this.http.put(`${this.appointmentsUrl}/${updatedAppointment.id}`, updatedAppointment);
  }

  userRemoveAppointments(appointment:Appointment){
    const updatedAppointment: Appointment = {
      ...appointment,
      available: true,
      patientId:null
    };

    return this.http.put(`${this.appointmentsUrl}/${updatedAppointment.id}`, updatedAppointment);
  }


}


