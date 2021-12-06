import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
   
  adminForm = new FormGroup({
    admin_name: new FormControl('', [Validators.required]),
    admin_email_address: new FormControl(''),
    admin_password: new FormControl(''),
    hospital_name: new FormControl(''),
    hospital_address: new FormControl(''),
    hospital_contact_no: new FormControl(''),
    hospital_logo: new FormControl('')
  })
   
  constructor(private adminService:AdminService) { }
  admin_info:any = []
  ngOnInit(): void {
    this.get_all_admin_info()
  }
  async get_all_admin_info()
	{
    let profile = JSON.parse(localStorage.getItem('profile'))
    this.adminService.get_all_admin_info_by_id(profile.admin_id).subscribe(
      (response:any) => {
        if(response.length > 0){
          this.admin_info = response[0];
          this.adminForm.patchValue(this.admin_info)
        }
      },
      (error:object) => {
        console.log("error", error);
      }
    );
  }
  edit_button_cliked(){
    let profile = JSON.parse(localStorage.getItem('profile'))
    this.adminService.edit_profile_info(profile.admin_id,this.adminForm.value).subscribe(
      (response:any) => {
        if(response.length > 0){
          this.admin_info = response[0];
          this.adminForm.patchValue(this.admin_info)
        }
      },
      (error:object) => {
        console.log("error", error);
      }
    );
  }
}
