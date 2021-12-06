import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
  appForm = new FormGroup({
    reason_for_appointment: new FormControl('')
  })
   
  constructor(private patientService:PatientService,private modalService: NgbModal) { }
  doctor_schedules:any = []
  selectedData:any = {}
  ngOnInit(): void {
    this.get_all_doctor_schedules()
  }
  async get_all_doctor_schedules()
	{
    this.patientService.get_all_doctor_schedules().subscribe(
      (response:any) => {
        if(response.length > 0){
          this.doctor_schedules = response;
        }
      },
      (error:object) => {
        console.log("error", error);
      }
    );
  }
  closeResult:any;
  
  
  open(content:any,data:object) {
    this.selectedData = data;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result:any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason:any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  addApp(){
    let obj = {
      patient_id:1,
      doctor_id:this.selectedData.doctor_id,
      doctor_schedule_id:this.selectedData.doctor_schedule_id,
      appointment_number:this.selectedData.appointment_number,
      reason_for_appointment:this.appForm.value.reason_for_appointment,
      appointment_time:this.selectedData.appointment_time
    }
    this.patientService.saveAppointment(obj)
    this.modalService.dismissAll('Save click')
  }
}
