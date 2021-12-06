import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
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
   
  constructor(private adminService:AdminService,private modalService: NgbModal) { }
  doctors:any = []
  selectedData:any = {}
  ngOnInit(): void {
    this.get_all_doctors()
  }
  async get_all_doctors()
	{
    this.adminService.get_all_doctors().subscribe(
      (response:any) => {
        if(response.length > 0){
          this.doctors = response;
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
    this.doctorForm.patchValue(this.selectedData)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result:any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason:any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  remove(name: string,id:number) {
    if(confirm("Are you sure to delete "+name)) {
      console.log("Implement delete functionality here");
      this.adminService.remove_doctors(id).subscribe(
        (response:any) => {
          if(response.length > 0){
            this.get_all_doctors()
          }
        },
        (error:object) => {
          console.log("error", error);
        }
      );
    }
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
  addDoc(){
    this.adminService.add_doctor(this.doctorForm.value).subscribe(
      (response:any) => {
        if(response.length > 0){
          this.get_all_doctors()
        }
      },
      (error:object) => {
        console.log("error", error);
      }
    );
    this.modalService.dismissAll('Save click')
  }
  editDoc(){
    this.adminService.edit_doctor(this.selectedData.doctor_id,this.doctorForm.value).subscribe(
      (response:any) => {
          this.get_all_doctors()
      },
      (error:object) => {
        console.log("error", error);
      }
    );
    this.modalService.dismissAll('Save click')
  }
}
