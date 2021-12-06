import { Controller, Logger } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class DoctorController {
  // Create a logger instance
  constructor(private readonly doctorService: DoctorService) { }


  @MessagePattern('create')
  async createDoctor(data: string) {
    try {
      let doctor_data = JSON.parse(data)
      if(!doctor_data.doctor_email_address){
        // throw new Error("Email not found");
        return {error:"Email not found"}
      }
      if(!doctor_data.doctor_password){
        return {error:"Password not found"}
      }
      if(!doctor_data.doctor_name){
        return {error:"Name not found"}
      }
      return this.doctorService.createDoctor(doctor_data);
    } catch (error) {
      console.log(error)
      return error;
    }
  }


  @MessagePattern('login')
  async login(data) {
    let patient_data = JSON.parse(data)
    if(!patient_data.email_address){
      // throw new Error("Email not found");
      return {error:"Email not found"}
    }
    if(!patient_data.password){
      return {error:"Password not found"}
    }
    return this.doctorService.loginDoctor(patient_data);
  }

  @MessagePattern('read')
  async getDoctor() {
    return this.doctorService.getDoctors();
  }


  @MessagePattern('readById')
  async getDoctorById(data: string) {
    let doctor_data = JSON.parse(data)
    console.log(doctor_data)
    return this.doctorService.getDoctorById(doctor_data);
  }

  @MessagePattern('update')
  async updateDoctor(data: string) {
    let doctor_data = JSON.parse(data)
    return this.doctorService.updateDoctor(doctor_data);
  }

  @MessagePattern('delete')
  async deleteDoctor(data: string) {
    let doctor_data = JSON.parse(data)
    return this.doctorService.deleteDoctor(doctor_data);
  }

  @MessagePattern('createDoctorSchedule')
  async createDoctorSchedule(data: string) {
    let doctor_data = JSON.parse(data)
    return this.doctorService.createDoctorSchedule(doctor_data);
  }

  @MessagePattern('updateDoctorSchedule')
  async updateDoctorSchedule(data: string) {
    let doctor_data = JSON.parse(data)
    return this.doctorService.updateDoctorSchedule(doctor_data);
  }

  @MessagePattern('removeDoctorSchedule')
  async removeDoctorSchedule(data: string) {
    let doctor_data = JSON.parse(data)
    return this.doctorService.removeDoctorSchedule(doctor_data);
  }
}
