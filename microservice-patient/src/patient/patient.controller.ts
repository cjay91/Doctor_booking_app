import { Controller, Logger } from '@nestjs/common';
import { PatientService } from './patient.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class PatientController {
  // Create a logger instance
  constructor(private readonly patientService: PatientService) { }


  @MessagePattern('create')
  async createPatient(data: string) {
    try {
      let patient_data = JSON.parse(data)
      if(!patient_data.patient_email_address){
        // throw new Error("Email not found");
        return {error:"Email not found"}
      }
      if(!patient_data.patient_password){
        return {error:"Password not found"}
      }
      return this.patientService.createPatient(patient_data);
    } catch (error) {
      console.log(error)
      return error;
    }
  }


  @MessagePattern('login')
  async loginPatient(data: string) {
    let patient_data = JSON.parse(data)
    if(!patient_data.patient_email_address){
      // throw new Error("Email not found");
      return {error:"Email not found"}
    }
    if(!patient_data.patient_password){
      return {error:"Password not found"}
    }
    return this.patientService.loginPatient(patient_data);
  }


  @MessagePattern('read')
  async getPatient() {
    return this.patientService.getPatients();
  }


  @MessagePattern('readById')
  async getPatientById(data: string) {
    let patient_data = JSON.parse(data)
    return this.patientService.getPatientById(patient_data);
  }


  @MessagePattern('readDoctorSchedule')
  async readDoctorSchedule() {
    return this.patientService.readDoctorSchedule();
  }


  @MessagePattern('readAppointmentByPatientId')
  async readAppointmentByPatientId(data: string) {
    let patient_data = JSON.parse(data)
    return this.patientService.readAppointmentByPatientId(patient_data);
  }

  @MessagePattern('update')
  async updatePatient(data: string) {
    let patient_data = JSON.parse(data)
    return this.patientService.updatePatient(patient_data);
  }

  @MessagePattern('delete')
  async deletePatient(data: string) {
    let patient_data = JSON.parse(data)
    return this.patientService.deletePatient(patient_data);
  }

  @MessagePattern('bookAppointment')
  async bookAppointment(data: string) {
    console.log("bookAppointment",data)
    let patient_data = JSON.parse(data)
    return this.patientService.bookAppointment(patient_data);
  }
}
