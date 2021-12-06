import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './schema/admin.entity';
import { getManager } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private adminRepository: Repository<Admin>) { }
  async createAdmin(data: Admin): Promise<object> {
    console.log(data)
    return await this.adminRepository.save(data);
  }  
  async getAdmins(): Promise<object> {
    return await this.adminRepository.find();
  }  
  async loginAdmin(data): Promise<object> {
    let admin_data =  await this.adminRepository.find({admin_email_address:data.email_address,admin_password:data.password});
    let response = JSON.parse(JSON.stringify(admin_data));
    if(response.length > 0){
      response[0]['role'] = 'admin';
      response[0]['token'] = jwt.sign(response[0], 'shhhhh');
    }
    return response;

  }  
  async getAdminById(data: Admin): Promise<object> {
    let filter = {}
    console.log('data',data)
    if(data.admin_id){
      filter["admin_id"] = data.admin_id
    }
    return await this.adminRepository.find(filter);
  }  
  async updateAdmin(data: Admin): Promise<object> {
    return await this.adminRepository.update(
      data.admin_id ,
      data
    );
  }  
  async deleteAdmin(data: Admin): Promise<object> {
    return await this.adminRepository.softDelete(
      data.admin_id
    );
  }

  async get_total_today_appointment()
	{
    console.log('abc')
    const entityManager = getManager();
    return await entityManager.query(`
    SELECT count(*) as total FROM appointment_table 
		INNER JOIN doctor_schedule_table 
		ON doctor_schedule_table.doctor_schedule_id = appointment_table.doctor_schedule_id 
		WHERE doctor_schedule_date = CURDATE() 
		;
  `, [])
  }
  
	async get_total_yesterday_appointment()
	{
    const entityManager = getManager();
    return await entityManager.query(`
    SELECT count(*) as total FROM appointment_table 
		INNER JOIN doctor_schedule_table 
		ON doctor_schedule_table.doctor_schedule_id = appointment_table.doctor_schedule_id 
		WHERE doctor_schedule_date = CURDATE()  - 1
		;
  `, [])
	}

	async get_total_seven_day_appointment()
	{
    const entityManager = getManager();
    return await entityManager.query(`
    SELECT count(*) as total FROM appointment_table 
		INNER JOIN doctor_schedule_table 
		ON doctor_schedule_table.doctor_schedule_id = appointment_table.doctor_schedule_id 
		WHERE doctor_schedule_date >= DATE(NOW()) - INTERVAL 7 DAY
		;
  `, [])
	}

	async get_total_appointment()
	{
    const entityManager = getManager();
    return await entityManager.query(`
    SELECT count(*) as total FROM appointment_table 
		;
  `, [])
	}

	async get_total_patient()
	{
    const entityManager = getManager();
    return await entityManager.query(`
    SELECT count(*) as total FROM patient_table 
		;
  `, [])
	}

	async get_doctor_schedule(data)
	{
    let where= ''
    if(data.token){
      let profile = jwt.decode(data.token)
      if(profile.role == 'doctor'){
        where = ` where doctor_schedule_table.doctor_id = ${profile.doctor_id}`
      }
    }
    const entityManager = getManager();
    return await entityManager.query(`
    SELECT * FROM doctor_schedule_table 
    INNER JOIN doctor_table 
    ON doctor_table.doctor_id = doctor_schedule_table.doctor_id ${where};
  `, [])
	}

	async get_appointments(data)
	{
    let where= ''
    if(data.token){
      let profile = jwt.decode(data.token)
      if(profile.role == 'doctor'){
        where = ` where doctor_table.doctor_id = ${profile.doctor_id}`
      }
    }
    const entityManager = getManager();
    return await entityManager.query(`
    SELECT * FROM appointment_table  
			INNER JOIN doctor_table 
			ON doctor_table.doctor_id = appointment_table.doctor_id 
			INNER JOIN doctor_schedule_table 
			ON doctor_schedule_table.doctor_schedule_id = appointment_table.doctor_schedule_id 
			INNER JOIN patient_table 
			ON patient_table.patient_id = appointment_table.patient_id ${where};
  `, [])
	}


	async appointmentById(data)
	{
    let where= ''
    if(data.token){
      let profile = jwt.decode(data.token)
      if(profile.role == 'doctor'){
        where = ` where doctor_table.doctor_id = ${profile.doctor_id}`
      }
    }
    const entityManager = getManager();
    let appointment_data = await entityManager.query(`
    SELECT * FROM appointment_table 
		WHERE appointment_id = ${data.appointment_id}
  `, [])
    for (const iterator of appointment_data) {
      appointment_data[appointment_data.indexOf(iterator)].patient_data = await entityManager.query(`
      SELECT * FROM patient_table 
			WHERE patient_id = ${iterator.patient_id}
    `, [])
    appointment_data[appointment_data.indexOf(iterator)].doctor_schedule_data = await entityManager.query(`
    SELECT * FROM doctor_schedule_table 
			INNER JOIN doctor_table 
			ON doctor_table.doctor_id = doctor_schedule_table.doctor_id 
			WHERE doctor_schedule_table.doctor_schedule_id = ${iterator.doctor_schedule_id}
  `, [])
    }
    return appointment_data
	}

}
