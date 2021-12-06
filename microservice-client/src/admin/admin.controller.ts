import { Controller, Logger, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Headers } from '@nestjs/common';

@Controller()
export class AdminController {

  constructor(private readonly adminService: AdminService) { }

  @Post('admin/signup')
  async signup(@Body() data: object) {
    return this.adminService.createAdmin(JSON.stringify(data));
  }

  @Post('admin/login')
  async login(@Body() data: object) {
    return this.adminService.loginAdmin(JSON.stringify(data));
  }

  @Get('admin')
  async getAllAdmins() {
    return this.adminService.getAllAdmins();
  }




  @Put('/admin/:id')
  async updateAdmin(@Param() params: any, @Body() data: object) {
    data['admin_id'] = params.id;
    return this.adminService.updateAdmin(JSON.stringify(data));
  }



  @Delete('/admin/:id')
  async deleteAdmin(@Param() params: any) {
    return this.adminService.deleteAdmin(JSON.stringify({ admin_id: params.id }));
  }



  @Get('/admin/total_today_appointment')
  async total_today_appointment() {
    return this.adminService.total_today_appointment();
  }



  @Get('/admin/total_yesterday_appointment')
  async total_yesterday_appointment() {
    return this.adminService.total_yesterday_appointment();
  }


  @Get('/admin/total_seven_day_appointment')
  async total_seven_day_appointment() {
    return this.adminService.total_seven_day_appointment();
  }




  @Get('/admin/total_appointment')
  async total_appointment() {
    return this.adminService.total_appointment();
  }



  @Get('/admin/total_patient')
  async total_patient() {
    return this.adminService.total_patient();
  }

  @Get('/admin/doctor_schedule')
  async doctor_schedule(@Headers() {authorization}: any) {
    let data = {}
    data['token'] = authorization
    return this.adminService.doctor_schedule(JSON.stringify(data));
  }

  @Get('/admin/appointments')
  async appointment(@Headers() {authorization}: any) {
    let data = {}
    data['token'] = authorization
    return this.adminService.appointments(JSON.stringify(data));
  }

  @Get('/admin/appointments/:id')
  async appointmentById(@Param() params: any,@Headers() {authorization}: any) {
    let data = {}
    data['token'] = authorization
    data['appointment_id'] = params.id
    return this.adminService.appointmentById(JSON.stringify(data));
  }
  

  @Get('/admin/:id')
  async getAdminById(@Param() params: any) {
    console.log('a',{ admin_id: params.id })
    return this.adminService.getAdminById(JSON.stringify({ admin_id: params.id }));
  }
}
