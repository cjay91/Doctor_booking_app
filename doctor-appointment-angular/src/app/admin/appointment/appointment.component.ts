import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  selectedData:any = {}
  appointment_detail:any = {}
  constructor(private adminService:AdminService,private modalService: NgbModal) { }
  appointments:any = []
  ngOnInit(): void {
    this.get_all_appointment()
  }
  async get_all_appointment()
	{
    this.adminService.get_all_appointment().subscribe(
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
  closeResult:any;
  
  async get_appointment_by_id(content,appointment)
	{
    this.adminService.get_appointment_by_id(appointment.appointment_id).subscribe(
      (response:any) => {
        if(response.length > 0){
          this.appointment_detail = response[0];
          this.open(content,appointment)
        }
      },
      (error:object) => {
        console.log("error", error);
      }
    );
  }
  
  open(content:any,data:object) {
    this.selectedData = data;
    // this.doctorForm.patchValue(this.selectedData)
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
}
