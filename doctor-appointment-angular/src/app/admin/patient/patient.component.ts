import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  constructor(private adminService:AdminService) { }
  patients:any = []
  ngOnInit(): void {
    this.get_all_patients()
  }
  async get_all_patients()
	{
    this.adminService.get_all_patients().subscribe(
      (response:any) => {
        if(response.length > 0){
          this.patients = response;
        }
      },
      (error:object) => {
        console.log("error", error);
      }
    );
  }
}
