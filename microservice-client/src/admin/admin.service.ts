import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AdminService {
  private admin_client: ClientProxy;
  private doctor_client: ClientProxy;

  constructor() {
    this.admin_client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8879,
      },
    });
    this.doctor_client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8878,
      },
    });
  }

  async createAdmin(data: string) {
    return await this.admin_client.send<string, string>('create', data);
  }

  async loginAdmin(data: string) {  
    const user_data = await this.admin_client.send<string, string>('login', data).toPromise();
    if(user_data.length > 0){
      return user_data;
    }else{
      const doc_data = await this.doctor_client.send<string, string>('login', data).toPromise();
      return doc_data;
    }
  }

  async getAllAdmins() {
    return await this.admin_client.send<string, string>('read','');
  }

  async getAdminById(data: string) {
    return await this.admin_client.send<string, string>('readById',data);
  }

  async updateAdmin(data: string) {
    return await this.admin_client.send<string, string>('update',data);
  }

  async deleteAdmin(data: string) {
    return await this.admin_client.send<string, string>('delete',data);
  }

  async total_today_appointment() {
    return await this.admin_client.send<string, string>('total_today_appointment','');
  }

  async total_yesterday_appointment() {
    return await this.admin_client.send<string, string>('total_yesterday_appointment','');
  }


  async total_seven_day_appointment() {
    return await this.admin_client.send<string, string>('total_seven_day_appointment','');
  }


  async total_appointment() {
    return await this.admin_client.send<string, string>('total_appointment','');
  }


  async total_patient() {
    return await this.admin_client.send<string, string>('total_patient','');
  }


  async doctor_schedule(data) {
    return await this.admin_client.send<string, string>('doctor_schedule',data);
  }

  async appointments(data) {
    return await this.admin_client.send<string, string>('appointments',data);
  }
  async appointmentById(data) {
    return await this.admin_client.send<string, string>('appointmentById',data);
  }
}
