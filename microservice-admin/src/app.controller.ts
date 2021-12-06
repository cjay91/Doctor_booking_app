import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  // Create a logger instance
  private logger = new Logger('AppController');

  constructor(private readonly appService: AppService) { }

  // // Define the message pattern for this method
  // @MessagePattern('create')
  // // Define the logic to be executed
  // async createUser(data: number[]) {
  //   this.logger.log('Adding ' + data.toString()); // Log something on every call
  //   return this.appService.createUser(data); // use math service to calc result & return
  // }
}
