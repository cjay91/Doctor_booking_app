import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { PatientService } from '../patient.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class PatientLoginComponent implements OnInit {
  loginForm = new FormGroup({
    patient_email_address: new FormControl('', [Validators.required]),
    patient_password: new FormControl('', [Validators.required])
  })
  constructor(private router: Router, private patientService: PatientService) { }

  ngOnInit(): void {
  }
  async register(){
    console.log('inside register')
    this.router.navigateByUrl('/patient/register');
  }
  async login(){
    this.patientService.login_patient(this.loginForm.value).subscribe(
      (response: any) => {
        if (response.length > 0) {
          this.router.navigateByUrl('/patient/dashboard');
          localStorage.setItem("profile",JSON.stringify(response[0]));
          setTimeout(() => {
            location.reload();
          }, 1000);

        }else{
          alert("Invalid Login")
        }
      },
      (error: object) => {
        console.log("error", error);
      }
    );
    
  }
}
