import { Component, Input } from '@angular/core';
import { AppointmentsService } from '../services/appointments.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import AppointmentDetailComponent from '../appointment-detail/appointment-detail.component'
import { Appointment } from '../interfaces/appointment';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss'],
  imports:[CommonModule,AppointmentDetailComponent],
  standalone: true
})
export class MyAppointmentsComponent {
  myAppointments: any[] = [];
  myPatient: any;
  todayDate: string = this.getCurrentDate();

  constructor(private appointmentService: AppointmentsService, private authService: AuthService) {
    this.myPatient = this.authService.user;
  }

  ngOnInit() {
    this.appointmentService.getMyAppointments(this.myPatient?.id).subscribe(appointments => {
        this.myAppointments = appointments;
    });
  }

  handleCancelAppointment(appointment: Appointment){
    this.appointmentService.userRemoveAppointments(appointment).subscribe(
      updatedAppointment => {
        console.log('Rendez-vous mis à jour avec succès :', updatedAppointment);
        alert("You successfully cancelled this appointment")
        if(this.myAppointments.length===1){
          this.myAppointments=[]
        }
        else{
          this.appointmentService.getMyAppointments(this.myPatient?.id).subscribe(appointments => {
            this.myAppointments = appointments;
        });
        }
     
      }
      )
  }
  getCurrentDate(): string {
    const currentDate = new Date();
  
    // Get year, month, and day components
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = currentDate.getDate().toString().padStart(2, '0');
  
    // Assemble the date in "yyyy-mm-dd" format
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  }

}
