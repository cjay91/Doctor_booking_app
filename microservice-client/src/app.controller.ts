import { Controller, Logger, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    // Create a logger instance
    private logger = new Logger('AppController');

  constructor(private readonly appService: AppService) {}
}
