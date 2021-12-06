import { Controller, Logger, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';

@Controller()
export class PatientController {

  constructor(private readonly patientService: PatientService) {}

  @Post('patients')
  async signup(@Body() data: object)  {
    return this.patientService.createPatient(JSON.stringify(data));
  }
  
  @Post('patients/login')
  async login(@Body() data: object)  {
    return this.patientService.loginPatient(JSON.stringify(data));
  }
  
  @Get('patients')
  async getAllPatients()  {
    return this.patientService.getAllPatients();
  }

  @Get('/patients/doctor_schedule')
  async getPatientDoctorSchedule(@Param() params: any)  {
    console.log('heee')
    return this.patientService.getPatientDoctorSchedule();
  }


  @Get('/patients/:id')
  async getPatientById(@Param() params: any)  {
    return this.patientService.getPatientById(JSON.stringify({patient_id:params.id}));
  }    



  @Put('/patients/:id')
  async updatePatient(@Param() params: any,@Body() data: object)  {
    data['patient_id'] = params.id;
    return this.patientService.updatePatient(JSON.stringify(data));
  }


  
  @Delete('/patients/:id')
  async deletePatient(@Param() params: any)  {
    return this.patientService.deletePatient(JSON.stringify({patient_id:params.id}));
  }

  @Get('/patients/:id/appointments')
  async getAppointmentsByPatientId(@Param() params: any)  {
    return this.patientService.getAppointmentsByPatientId(JSON.stringify({patient_id:params.id}));
  }    

}
