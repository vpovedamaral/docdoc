import { Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth-guards";
import { MyAppointmentsComponent } from "../my-appointments/my-appointments.component";
import AppointmentListComponent from "../appointment-list/appointment-list.component";
import ProfileComponent from "../profile/profile.component";
import { DoctorDetailComponent } from "../doctor-detail/doctor-detail.component";


export const routes: Routes = [
    {
        path: '',
        canActivate: [() => {
            return true;
        }],
        loadComponent: () => import('src/app/home/home.component')
    },
    {
        path: 'my-appointments',
        component: MyAppointmentsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'appointments-list',
        component: AppointmentListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'doctors/:id', component: DoctorDetailComponent,
        canActivate:[AuthGuard] 
    }
]