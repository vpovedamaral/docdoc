import { Component, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { Appointment } from '../interfaces/appointment';
import { Patient } from '../interfaces/patient';
import { Doctor } from '../interfaces/doctor';
import { Router } from '@angular/router';
import { DirectiveModule } from '../directive.module';
import { PipesModule } from '../pipe.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss'],
  standalone: true,
  imports:[DirectiveModule,PipesModule,CommonModule,],
})
export default class AppointmentDetailComponent {

  todayDate: string = this.getCurrentDate();

  constructor(private router: Router) { }
  @Input() appointment?: Appointment;
  @Input() patient?: Patient;
  @Output() onCancelAppointment: EventEmitter<Appointment> = new EventEmitter<Appointment>();


  cancelAppointment() {
    this.onCancelAppointment.emit(this.appointment);
  }

  navigateDoctor(doctor?:Doctor){
    if (doctor?.id) {
      this.router.navigate(['/home/doctors', doctor.id]);
    }
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
