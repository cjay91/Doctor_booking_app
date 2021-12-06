import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './schema/doctor.entity';
import { DoctorSchedule } from './schema/doctorSchedule.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class DoctorService {
  constructor(@InjectRepository(Doctor) private doctorRepository: Repository<Doctor>,@InjectRepository(DoctorSchedule) private doctorScheduleRepository: Repository<DoctorSchedule>) { }
  async createDoctor(data: Doctor): Promise<object> { 
    console.log(data)
    return await this.doctorRepository.save(data);
  }  
  async loginDoctor(data): Promise<object> {
    let doctor_data =  await this.doctorRepository.find({doctor_email_address:data.email_address,doctor_password:data.password});
    let response = JSON.parse(JSON.stringify(doctor_data));
    if(response.length > 0){
      response[0]['role'] = 'doctor';
      response[0]['token'] = jwt.sign(response[0], 'shhhhh');
    }
    return response;
  }  
  async getDoctors(): Promise<object> {
    return await this.doctorRepository.find();
  }  
  async getDoctorById(data: Doctor): Promise<object> {
    let filter = {}
    if(data.doctor_id){
      filter["doctor_id"] = data.doctor_id
    }
    return await this.doctorRepository.find(filter);
  }  
  async updateDoctor(data: Doctor): Promise<object> {
    return await this.doctorRepository.update(
      data.doctor_id ,
      data
    );
  }  
  async deleteDoctor(data: Doctor): Promise<object> {
    console.log('data',data)
    return await this.doctorRepository.delete(
      data.doctor_id
    );
  }
  async createDoctorSchedule(data: any): Promise<object> {
    console.log('data',data)
    return await this.doctorScheduleRepository.save(data);
  }
  async updateDoctorSchedule(data: any): Promise<object> {
    console.log('data',data)
    delete data['token']
    return await this.doctorScheduleRepository.update(
      data.doctor_schedule_id ,
      data
    );
  }
  
  async removeDoctorSchedule(data: any): Promise<object> {
    console.log('data',data)
    return await this.doctorScheduleRepository.delete(
      data.doctor_schedule_id
    );
  }

}
