import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppointmentComponent } from './admin/appointment/appointment.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DoctorProfileComponent } from './admin/doctor-profile/doctor-profile.component';
import { DoctorScheduleComponent } from './admin/doctor-schedule/doctor-schedule.component';
import { DoctorComponent } from './admin/doctor/doctor.component';
import { LoginComponent } from './admin/login/login.component';
import { PatientComponent } from './admin/patient/patient.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { PatientDashboardComponent } from './patient/dashboard/dashboard.component';
import { PatientLoginComponent } from './patient/login/login.component';
import { RegisterComponent } from './patient/register/register.component';
import { PatientProfileComponent } from './patient/profile/profile.component';
import { MyappointmentslistComponent } from './patient/myappointmentslist/myappointmentslist.component';
import { BookappointmentsComponent } from './patient/bookappointments/bookappointments.component';
import { DoctorsschedulelistComponent } from './patient/doctorsschedulelist/doctorsschedulelist.component';
import { PatientOwnComponent } from './patient/patient.component';
const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: "admin/login" },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'login', component: LoginComponent },
      { path: 'doctor', component: DoctorComponent },
      { path: 'patient', component: PatientComponent },
      { path: 'doctor-schedule', component: DoctorScheduleComponent },
      { path: 'appointment', component: AppointmentComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'doctor-profile', component: DoctorProfileComponent },
    ]
  },
  {
    path: 'patient', component: PatientOwnComponent, children: [
      { path: 'dashboard', component: PatientDashboardComponent },
      { path: 'login', component: PatientLoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'profile', component: PatientProfileComponent },
      { path: 'myappointmentslist', component: MyappointmentslistComponent },
      { path: 'bookappointments', component: BookappointmentsComponent },
      { path: 'doctorsschedulelist', component: DoctorsschedulelistComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
