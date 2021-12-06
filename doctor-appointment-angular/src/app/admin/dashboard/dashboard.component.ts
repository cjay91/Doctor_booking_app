import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private adminService:AdminService) { }
  total_today_appointment = 0;
  total_yesterday_appointment = 0;
  total_seven_day_appointment = 0;
  total_appointment = 0;
  total_patient = 0;
  ngOnInit(): void {
    this.get_total_today_appointment();
    this.get_total_yesterday_appointment();
    this.get_total_seven_day_appointment();
    this.get_total_appointment();
    this.get_total_patient();
  }
  async get_total_today_appointment()
	{
    this.adminService.get_total_today_appointment().subscribe(
      (response:any) => {
        if(response.length > 0){
          this.total_today_appointment = response[0].total;
        }
      },
      (error:object) => {
        console.log("error", error);
      }
    );
  }
  
	async get_total_yesterday_appointment()
	{
    this.adminService.get_total_yesterday_appointment().subscribe(
      (response:any) => {
        if(response.length > 0){
          this.total_yesterday_appointment = response[0].total;
        }
      },
      (error:object) => {
        console.log("error", error);
      }
    );
	}

	async get_total_seven_day_appointment()
	{
    this.adminService.get_total_seven_day_appointment().subscribe(
      (response:any) => {
        if(response.length > 0){
          this.total_seven_day_appointment = response[0].total;
        }
      },
      (error:object) => {
        console.log("error", error);
      }
    );
	}

	async get_total_appointment()
	{
    this.adminService.get_total_appointment().subscribe(
      (response:any) => {
        if(response.length > 0){
          this.total_appointment = response[0].total;
        }
      },
      (error:object) => {
        console.log("error", error);
      }
    );
	}

	async get_total_patient()
	{
    this.adminService.get_total_patient().subscribe(
      (response:any) => {
        if(response.length > 0){
          this.total_patient = response[0].total;
        }
      },
      (error:object) => {
        console.log("error", error);
      }
    );
	}
}
