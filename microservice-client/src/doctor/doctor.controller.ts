import { Controller, Logger, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Headers } from '@nestjs/common';

@Controller()
export class DoctorController {

  constructor(private readonly doctorService: DoctorService) { }

  @Post('doctors')
  async signup(@Body() data: object) {
    return this.doctorService.createDoctor(JSON.stringify(data));
  }

  @Post('doctors/login')
  async login(@Body() data: object) {
    return this.doctorService.loginDoctor(JSON.stringify(data));
  }

  @Get('doctors')
  async getAllDoctors() {
    return this.doctorService.getAllDoctors();
  }


  @Get('/doctors/:id')
  async getDoctorById(@Param() params: any) {
    return this.doctorService.getDoctorById(JSON.stringify({ doctor_id: params.id }));
  }



  @Put('/doctors/:id')
  async updateDoctor(@Param() params: any, @Body() data: object) {
    data['doctor_id'] = params.id;
    return this.doctorService.updateDoctor(JSON.stringify(data));
  }



  @Delete('/doctors/:id')
  async deleteDoctor(@Param() params: any) {
    return this.doctorService.deleteDoctor(JSON.stringify({ doctor_id: params.id }));
  }

  
  @Post('doctors/schedule')
  async createDoctorSchedule(@Body() data: object,@Headers() {authorization}: any) {
    data['token'] = authorization
    return this.doctorService.createDoctorSchedule(JSON.stringify(data));
  }

  
  @Put('doctors/schedule/:id')
  async updateDoctorSchedule(@Param() params: any,@Body() data: object,@Headers() {authorization}: any) {
    data['token'] = authorization
    data['doctor_schedule_id'] = params.id;
    return this.doctorService.updateDoctorSchedule(JSON.stringify(data));
  }

  @Delete('doctors/schedule/:id')
  async removeDoctorSchedule(@Param() params: any,@Body() data: object,@Headers() {authorization}: any) {
    data['token'] = authorization
    data['doctor_schedule_id'] = params.id;
    return this.doctorService.removeDoctorSchedule(JSON.stringify(data));
  }

}
