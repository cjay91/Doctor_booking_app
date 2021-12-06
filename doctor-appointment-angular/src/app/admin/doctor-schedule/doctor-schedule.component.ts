import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import {NgbModal, ModalDismissReasons,NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-doctor-schedule',
  templateUrl: './doctor-schedule.component.html',
  styleUrls: ['./doctor-schedule.component.scss']
})
export class DoctorScheduleComponent implements OnInit {
  time = {hour: 14, minute: 30};
  model!: string | NgbDateStruct;
  $event: any;
  selectedData:any = {}
  doctorScheduleForm = new FormGroup({
    doctor_id	: new FormControl('', [Validators.required]),
    doctor_schedule_date	: new FormControl(''),
    // doctor_schedule_day	: new FormControl(''),
    doctor_schedule_start_time: new FormControl(''),
    doctor_schedule_end_time: new FormControl(''),
    average_consulting_time: new FormControl('')
  })
   
  constructor(private adminService:AdminService,private modalService: NgbModal) { }
  doctor_schedules:any = []
  doctors:any = []
  ngOnInit(): void {
    this.get_all_doctor_schedule()
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
  
  clickMethod(name: string) {
    if(confirm("Are you sure to "+ name+" it")) {
      console.log("Implement delete functionality here");
    }
  }

  open(content:any,data:object) {
    this.selectedData = data;
    this.doctorScheduleForm.patchValue(this.selectedData)
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
  async get_all_doctor_schedule()
	{
    this.adminService.get_all_doctor_schedule().subscribe(
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
  addDocSchedule(){
    if(this.doctorScheduleForm.value.doctor_schedule_date.month < 10){
      this.doctorScheduleForm.value.doctor_schedule_date.month = `0${this.doctorScheduleForm.value.doctor_schedule_date.month}`
    }
    if(this.doctorScheduleForm.value.doctor_schedule_date.day < 10){
      this.doctorScheduleForm.value.doctor_schedule_date.day = `0${this.doctorScheduleForm.value.doctor_schedule_date.day}`
    }
    if(this.doctorScheduleForm.value.doctor_schedule_start_time.hour < 10){
      this.doctorScheduleForm.value.doctor_schedule_start_time.hour = `0${this.doctorScheduleForm.value.doctor_schedule_start_time.hour}`
    }
    if(this.doctorScheduleForm.value.doctor_schedule_start_time.minute < 10){
      this.doctorScheduleForm.value.doctor_schedule_start_time.minute = `0${this.doctorScheduleForm.value.doctor_schedule_start_time.minute}`
    }
    if(this.doctorScheduleForm.value.doctor_schedule_start_time.second < 10){
      this.doctorScheduleForm.value.doctor_schedule_start_time.second = `0${this.doctorScheduleForm.value.doctor_schedule_start_time.second}`
    }
    if(this.doctorScheduleForm.value.doctor_schedule_end_time.hour < 10){
      this.doctorScheduleForm.value.doctor_schedule_end_time.hour = `0${this.doctorScheduleForm.value.doctor_schedule_end_time.hour}`
    }
    if(this.doctorScheduleForm.value.doctor_schedule_end_time.minute < 10){
      this.doctorScheduleForm.value.doctor_schedule_end_time.minute = `0${this.doctorScheduleForm.value.doctor_schedule_end_time.minute}`
    }
    if(this.doctorScheduleForm.value.doctor_schedule_end_time.second < 10){
      this.doctorScheduleForm.value.doctor_schedule_end_time.second = `0${this.doctorScheduleForm.value.doctor_schedule_end_time.second}`
    }
    this.doctorScheduleForm.value.doctor_schedule_date = `${this.doctorScheduleForm.value.doctor_schedule_date.year}-${this.doctorScheduleForm.value.doctor_schedule_date.month}-${this.doctorScheduleForm.value.doctor_schedule_date.day}`
    this.doctorScheduleForm.value.doctor_schedule_start_time = `${this.doctorScheduleForm.value.doctor_schedule_start_time.hour}:${this.doctorScheduleForm.value.doctor_schedule_start_time.minute}:${this.doctorScheduleForm.value.doctor_schedule_start_time.second}`
    this.doctorScheduleForm.value.doctor_schedule_end_time = `${this.doctorScheduleForm.value.doctor_schedule_end_time.hour}:${this.doctorScheduleForm.value.doctor_schedule_end_time.minute}:${this.doctorScheduleForm.value.doctor_schedule_end_time.second}`
    this.adminService.add_doctor_schedule(this.doctorScheduleForm.value).subscribe(
      (response:any) => {
        if(response.length > 0){
          this.get_all_doctor_schedule()
        }
      },
      (error:object) => {
        console.log("error", error);
      }
    );
    this.modalService.dismissAll('Save click')
  }
  editDocSchedule(){
    if(this.doctorScheduleForm.value.doctor_schedule_date.month < 10){
      this.doctorScheduleForm.value.doctor_schedule_date.month = `0${this.doctorScheduleForm.value.doctor_schedule_date.month}`
    }
    if(this.doctorScheduleForm.value.doctor_schedule_date.day < 10){
      this.doctorScheduleForm.value.doctor_schedule_date.day = `0${this.doctorScheduleForm.value.doctor_schedule_date.day}`
    }
    if(this.doctorScheduleForm.value.doctor_schedule_start_time.hour < 10){
      this.doctorScheduleForm.value.doctor_schedule_start_time.hour = `0${this.doctorScheduleForm.value.doctor_schedule_start_time.hour}`
    }
    if(this.doctorScheduleForm.value.doctor_schedule_start_time.minute < 10){
      this.doctorScheduleForm.value.doctor_schedule_start_time.minute = `0${this.doctorScheduleForm.value.doctor_schedule_start_time.minute}`
    }
    if(this.doctorScheduleForm.value.doctor_schedule_start_time.second < 10){
      this.doctorScheduleForm.value.doctor_schedule_start_time.second = `0${this.doctorScheduleForm.value.doctor_schedule_start_time.second}`
    }
    if(this.doctorScheduleForm.value.doctor_schedule_end_time.hour < 10){
      this.doctorScheduleForm.value.doctor_schedule_end_time.hour = `0${this.doctorScheduleForm.value.doctor_schedule_end_time.hour}`
    }
    if(this.doctorScheduleForm.value.doctor_schedule_end_time.minute < 10){
      this.doctorScheduleForm.value.doctor_schedule_end_time.minute = `0${this.doctorScheduleForm.value.doctor_schedule_end_time.minute}`
    }
    if(this.doctorScheduleForm.value.doctor_schedule_end_time.second < 10){
      this.doctorScheduleForm.value.doctor_schedule_end_time.second = `0${this.doctorScheduleForm.value.doctor_schedule_end_time.second}`
    }
    this.doctorScheduleForm.value.doctor_schedule_date = `${this.doctorScheduleForm.value.doctor_schedule_date.year}-${this.doctorScheduleForm.value.doctor_schedule_date.month}-${this.doctorScheduleForm.value.doctor_schedule_date.day}`
    this.doctorScheduleForm.value.doctor_schedule_start_time = `${this.doctorScheduleForm.value.doctor_schedule_start_time.hour}:${this.doctorScheduleForm.value.doctor_schedule_start_time.minute}:${this.doctorScheduleForm.value.doctor_schedule_start_time.second}`
    this.doctorScheduleForm.value.doctor_schedule_end_time = `${this.doctorScheduleForm.value.doctor_schedule_end_time.hour}:${this.doctorScheduleForm.value.doctor_schedule_end_time.minute}:${this.doctorScheduleForm.value.doctor_schedule_end_time.second}`
    this.adminService.edit_doctor_schedule(this.selectedData.doctor_schedule_id,this.doctorScheduleForm.value).subscribe(
      (response:any) => {
          this.get_all_doctor_schedule()
      },
      (error:object) => {
        console.log("error", error);
      }
    );
    this.modalService.dismissAll('Save click')
  }
  remove(name: string,id:number) {
    if(confirm("Are you sure to delete "+name)) {
      console.log("Implement delete functionality here");
      this.adminService.remove_doctor_schedule(id).subscribe(
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
  
}
