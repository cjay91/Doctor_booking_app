import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email_address: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  constructor(private router: Router, private adminService:AdminService) { }

  ngOnInit(): void {
  }
  async login(){
    this.adminService.login_admin(this.loginForm.value).subscribe(
      (response: any) => {
        if (response.length > 0) {
          debugger;
          if(response[0].role == 'doctor'){
            this.router.navigateByUrl('/admin/doctor-schedule');
          }else{
            this.router.navigateByUrl('/admin/dashboard');
          }
          this.router.navigateByUrl('/admin/dashboard');
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
