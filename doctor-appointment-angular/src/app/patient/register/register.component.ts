import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { PatientService } from '../patient.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    patient_email_address: new FormControl('', [Validators.required]),
    patient_password: new FormControl(''),
    patient_first_name: new FormControl(''),
    patient_last_name: new FormControl(''),
    patient_date_of_birth: new FormControl(''),
    patient_gender: new FormControl(''),
    patient_phone_no: new FormControl(''),
    patient_maritial_status: new FormControl(''),
    patient_address: new FormControl(''),
  })
  constructor(private router: Router, private patientService: PatientService) { }

  ngOnInit(): void {
    console.log(this.router.url)
  }
  async register() {
    this.patientService.register_patient(this.registerForm.value).subscribe(
      (response: any) => {
        if (response) {
          this.router.navigateByUrl('/patient/login');
          setTimeout(() => {
            location.reload();
          }, 1000);

        }
      },
      (error: object) => {
        console.log("error", error);
      }
    );
  }
  async login() {
    this.router.navigateByUrl('/patient/login');
  }
}
