import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DoctorComponent } from './admin/doctor/doctor.component';
import { PatientComponent } from './admin/patient/patient.component';
import { DoctorScheduleComponent } from './admin/doctor-schedule/doctor-schedule.component';
import { AppointmentComponent } from './admin/appointment/appointment.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { DoctorProfileComponent } from './admin/doctor-profile/doctor-profile.component';
import { RegisterComponent } from './patient/register/register.component';
import { MyappointmentslistComponent } from './patient/myappointmentslist/myappointmentslist.component';
import { BookappointmentsComponent } from './patient/bookappointments/bookappointments.component';
import { DoctorsschedulelistComponent } from './patient/doctorsschedulelist/doctorsschedulelist.component';
import { PatientOwnComponent } from './patient/patient.component';
import { PatientService } from './patient/patient.service';
import { AdminService } from './admin/admin.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientDashboardComponent } from './patient/dashboard/dashboard.component';
import { PatientProfileComponent } from './patient/profile/profile.component';
// import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientLoginComponent } from './patient/login/login.component';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DoctorComponent,
    PatientComponent,
    DoctorScheduleComponent,
    AppointmentComponent,
    ProfileComponent,
    AdminComponent,
    DoctorProfileComponent,
    RegisterComponent,
    MyappointmentslistComponent,
    BookappointmentsComponent,
    DoctorsschedulelistComponent,
    PatientOwnComponent,
    PatientDashboardComponent,
    PatientProfileComponent,
    PatientLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    GraphQLModule,
    // NgbDate,
  ],
  providers: [AdminService,PatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
