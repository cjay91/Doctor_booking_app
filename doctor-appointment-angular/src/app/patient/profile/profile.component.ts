import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class PatientProfileComponent implements OnInit {
  edit = false;
  patientForm = new FormGroup({
    patient_email_address: new FormControl('', [Validators.required]),
    patient_password: new FormControl(''),
    patient_first_name: new FormControl(''),
    patient_last_name: new FormControl(''),
    patient_date_of_birth: new FormControl(''),
    patient_gender: new FormControl(''),
    patient_phone_no: new FormControl(''),
    patient_maritial_status: new FormControl(''),
    patient_address: new FormControl('')
  })
   
  constructor(private patientService:PatientService) { }
  patient:any = []
  ngOnInit(): void {
    this.get_patient_by_id()
  }
  async get_patient_by_id()
	{
    let profile = JSON.parse(localStorage.getItem("profile"))
    this.patientService.get_patient_by_id(profile.patient_id).subscribe(
      (response:any) => {
        if(response.length > 0){
          this.patient = response[0];
          this.patientForm.patchValue(this.patient)
        }
      },
      (error:object) => {
        console.log("error", error);
      }
    );
  }
  handleEdit(edit:boolean){
    this.edit = edit;
  }
  edit_button_cliked(){
    let profile = JSON.parse(localStorage.getItem("profile"))
    this.patientService.edit_patient_profile_info(profile.patient_id,this.patientForm.value).subscribe(
      (response:any) => {
        if(response.length > 0){
          this.patient = response[0];
          this.patientForm.patchValue(this.patient)
        }
      },
      (error:object) => {
        console.log("error", error);
      }
    );
  }
}
