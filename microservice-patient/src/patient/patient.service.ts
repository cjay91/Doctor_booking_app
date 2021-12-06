import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { Patient } from './schema/patient.entity';
// import { Appointment } from './schema/appointment.entity';
// import { BookAppointmentInput } from './graphql-schema/book-appointment.input';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PatientService {
  constructor(@InjectRepository(Patient) private patientRepository: Repository<Patient>) { }
  async createPatient(data: Patient): Promise<object> {
    console.log(data)
    return await this.patientRepository.save(data);
  }  
  async getPatients(): Promise<object> {
    return await this.patientRepository.find();
  }  
  async loginPatient(data): Promise<object> {
    let patient_data = await this.patientRepository.find({patient_email_address:data.patient_email_address,patient_password:data.patient_password});
    let response = JSON.parse(JSON.stringify(patient_data));
    if(response.length > 0){
      response[0]['role'] = 'patient';
      response[0]['token'] = jwt.sign(response[0], 'shhhhh');
    }
    return response;
  }  
  async getPatientById(data: Patient): Promise<object> {
    let filter = {}
    if(data.patient_id){
      filter["patient_id"] = data.patient_id
    }
    return await this.patientRepository.find(filter);
  }  
  async readDoctorSchedule(): Promise<object> {
    const entityManager = getManager();
    console.log('heee')
    return await entityManager.query(`
    SELECT * FROM doctor_schedule_table 
    INNER JOIN doctor_table 
    ON doctor_table.doctor_id = doctor_schedule_table.doctor_id
    WHERE doctor_schedule_table.doctor_schedule_date >= CURDATE() 
    AND doctor_schedule_table.doctor_schedule_status = 'Active' 
    AND doctor_table.doctor_status = 'Active' 
    ORDER BY doctor_schedule_table.doctor_schedule_date ASC
  `, [])
  }  
  async readAppointmentByPatientId(patient_data:any): Promise<object> {
    const entityManager = getManager();
    console.log('heee')
    return await entityManager.query(`
    SELECT * FROM appointment_table  
		INNER JOIN doctor_table 
		ON doctor_table.doctor_id = appointment_table.doctor_id 
		INNER JOIN doctor_schedule_table 
		ON doctor_schedule_table.doctor_schedule_id = appointment_table.doctor_schedule_id 
    WHERE appointment_table.patient_id = '$1'
  `, [patient_data.patien_id])
  }  
  async updatePatient(data: Patient): Promise<object> {
    return await this.patientRepository.update(
      data.patient_id ,
      data
    );
  }  
  async deletePatient(data: Patient): Promise<object> {
    return await this.patientRepository.softDelete(
      data.patient_id
    );
  }
  async bookAppointment(data: Patient): Promise<object> {

    console.log("data");
    console.log(data);
    return await this.patientRepository.save(data);
  }
}
