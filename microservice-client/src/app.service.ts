import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private patient_client: ClientProxy;
  private doctor_client: ClientProxy;
  private admin_client: ClientProxy;

  constructor() {
    this.patient_client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
      },
    });
    this.doctor_client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8878,
      },
    });
    this.admin_client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8879,
      },
    });
  }

  public create_doctor(data: number[]) {
    return this.doctor_client.send<number, number[]>('create', data);
  }

  public create_admin(data: number[]) {
    return this.admin_client.send<number, number[]>('create', data);
  }

  public create_patient(data: number[]) {
    return this.patient_client.send<number, number[]>('create', data);
  }
}
