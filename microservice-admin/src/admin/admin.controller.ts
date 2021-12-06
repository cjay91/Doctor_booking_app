import { Controller, Logger } from '@nestjs/common';
import { AdminService } from './admin.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AdminController {
  // Create a logger instance
  constructor(private readonly adminService: AdminService) { }


  @MessagePattern('create')
  async createAdmin(data: string) {
    try {
      console.log('here')
      let admin_data = JSON.parse(data)
      if(!admin_data.admin_email_address){
        // throw new Error("Email not found");
        return {error:"Email not found"}
      }
      if(!admin_data.admin_password){
        return {error:"Password not found"}
      }
      if(!admin_data.admin_name){
        return {error:"Name not found"}
      }
      if(!admin_data.hospital_name){
        return {error:"Hospital Name not found"}
      }
      if(!admin_data.hospital_address){
        return {error:"Hospital Address not found"}
      }
      return this.adminService.createAdmin(admin_data);
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
    return this.adminService.loginAdmin(patient_data);
  }

  @MessagePattern('read')
  async getAdmin() {
    console.log('here1')
    return this.adminService.getAdmins();
  }


  @MessagePattern('readById')
  async getAdminById(data: string) {
    console.log('here2',data)
    let admin_data = JSON.parse(data)
    return this.adminService.getAdminById(admin_data);
  }

  @MessagePattern('update')
  async updateAdmin(data: string) {
    console.log('here3')
    let admin_data = JSON.parse(data)
    return this.adminService.updateAdmin(admin_data);
  }

  @MessagePattern('delete')
  async deleteAdmin(data: string) {
    console.log('here4')
    let admin_data = JSON.parse(data)
    return this.adminService.deleteAdmin(admin_data);
  }




  @MessagePattern('total_today_appointment')
  async get_total_today_appointment() {
    console.log('here5')   
    return this.adminService.get_total_today_appointment();
  }


  @MessagePattern('total_yesterday_appointment')
  async get_total_yesterday_appointment() {
    console.log('here6')
    return this.adminService.get_total_yesterday_appointment();
  }



  @MessagePattern('total_seven_day_appointment')
  async get_total_seven_day_appointment() {
    console.log('here7')
    return this.adminService.get_total_seven_day_appointment();
  }




  @MessagePattern('total_appointment')
  async get_total_appointment() {
    console.log('here8')
    return this.adminService.get_total_appointment();
  }




  @MessagePattern('total_patient')
  async get_total_patient() {
    console.log('here9')
    return this.adminService.get_total_patient();
  }


  @MessagePattern('doctor_schedule')
  async get_doctor_schedule(data:any) {
    console.log('here10',data)
    return this.adminService.get_doctor_schedule(JSON.parse(data));
  }


  @MessagePattern('appointments')
  async get_appointments(data:any) {
    console.log('here11',data)
    return this.adminService.get_appointments(JSON.parse(data));
  }

  @MessagePattern('appointmentById')
  async appointmentById(data:any) {
    console.log('here11',data)
    return this.adminService.appointmentById(JSON.parse(data));
  }
}
