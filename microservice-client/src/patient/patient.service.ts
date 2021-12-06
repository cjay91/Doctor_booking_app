import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PatientService {
  private patient_client: ClientProxy;

  constructor() {
    this.patient_client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
      },
    });
  }

  async createPatient(data: string) {
    return await this.patient_client.send<string, string>('create', data);
  }

  async loginPatient(data: string) {
    return await this.patient_client.send<string, string>('login', data);
  }

  async getAllPatients() {
    return await this.patient_client.send<string, string>('read','');
  }

  async getPatientById(data: string) {
    return await this.patient_client.send<string, string>('readById',data);
  }


  async getAppointmentsByPatientId(data: string) {
    return await this.patient_client.send<string, string>('readAppointmentByPatientId',data);
  }

  async getPatientDoctorSchedule() {
    return await this.patient_client.send<string, string>('readDoctorSchedule','');
  }

  async updatePatient(data: string) {
    return await this.patient_client.send<string, string>('update',data);
  }

  async deletePatient(data: string) {
    return await this.patient_client.send<string, string>('delete',data);
  }
  async bookAppointment(data: string) {
    console.log('aaaa')
    return await this.patient_client.send<string, string>('bookAppointments',data);
  }
}
