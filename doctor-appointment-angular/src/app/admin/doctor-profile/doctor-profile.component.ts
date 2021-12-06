import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {

  doctorForm = new FormGroup({
    doctor_email_address: new FormControl('', [Validators.required]),
    doctor_password: new FormControl(''),
    doctor_name: new FormControl(''),
    doctor_phone_no: new FormControl(''),
    doctor_address: new FormControl(''),
    doctor_date_of_birth: new FormControl(''),
    doctor_degree: new FormControl(''),
    doctor_expert_in: new FormControl(''),
    doctor_profile_image: new FormControl(''),
  })
   
  constructor(private adminService:AdminService) { }
  doctor_info:any = []
  ngOnInit(): void {
    this.get_doctor_info_by_id()
  }
  async get_doctor_info_by_id()
	{
    let profile = JSON.parse(localStorage.getItem('profile'))
    this.adminService.get_doctor_info_by_id(profile.doctor_id).subscribe(
      (response:any) => {
        if(response.length > 0){
          this.doctor_info = response[0];
          this.doctorForm.patchValue(this.doctor_info)
        }
      },
      (error:object) => {
        console.log("error", error);
      }
    );
  }
  edit_button_cliked(){
    let profile = JSON.parse(localStorage.getItem("profile"))
    if(profile["role"] == 'doctor'){
      this.adminService.edit_doctor_profile_info(profile['doctor_id'],this.doctorForm.value).subscribe(
        (response:any) => {
          if(response.length > 0){
            this.doctor_info = response[0];
            this.doctorForm.patchValue(this.doctor_info)
          }
        },
        (error:object) => {
          console.log("error", error);
        }
      );    
    }else{
      this.adminService.edit_admin_profile_info(profile['admin_id'],this.doctorForm.value).subscribe(
        (response:any) => {
          if(response.length > 0){
            this.doctor_info = response[0];
            this.doctorForm.patchValue(this.doctor_info)
          }
        },
        (error:object) => {
          console.log("error", error);
        }
      );
    }
  }
}
