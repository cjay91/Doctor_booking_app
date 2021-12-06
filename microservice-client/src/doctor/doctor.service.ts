import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class DoctorService {
  private doctor_client: ClientProxy;

  constructor() {
    this.doctor_client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8878,
      },
    });
  }

  async createDoctor(data: string) {
    return await this.doctor_client.send<string, string>('create', data);
  }

  async loginDoctor(data: string) {
    return await this.doctor_client.send<string, string>('login', data);
  }

  async getAllDoctors() {
    return await this.doctor_client.send<string, string>('read','');
  }

  async getDoctorById(data: string) {
    return await this.doctor_client.send<string, string>('readById',data);
  }

  async updateDoctor(data: string) {
    return await this.doctor_client.send<string, string>('update',data);
  }

  async deleteDoctor(data: string) {
    return await this.doctor_client.send<string, string>('delete',data);
  }

  async createDoctorSchedule(data: string) {
    return await this.doctor_client.send<string, string>('createDoctorSchedule',data);
  }

  async updateDoctorSchedule(data: string) {
    return await this.doctor_client.send<string, string>('updateDoctorSchedule',data);
  }

  async removeDoctorSchedule(data: string) {
    return await this.doctor_client.send<string, string>('removeDoctorSchedule',data);
  }
}
