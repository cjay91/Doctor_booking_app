import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-myappointmentslist',
  templateUrl: './myappointmentslist.component.html',
  styleUrls: ['./myappointmentslist.component.scss']
})
export class MyappointmentslistComponent implements OnInit {

  constructor(private patientService:PatientService) { }
  appointments:any = []
  ngOnInit(): void {
    this.get_all_patient_appointments()
  }
  async get_all_patient_appointments()
	{
    let profile = JSON.parse(localStorage.getItem("profile"))
    this.patientService.get_all_patient_appointments(profile.patient_id).subscribe(
      (response:any) => {
        if(response.length > 0){
          this.appointments = response;
        }
      },
      (error:object) => {
        console.log("error", error);
      }
    );
  }
}
