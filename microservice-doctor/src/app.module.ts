import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './doctor/doctor.module';
import { Doctor } from './doctor/schema/doctor.entity';
import { DoctorSchedule } from './doctor/schema/doctorSchedule.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'doctor_appointment',
    entities: [Doctor,DoctorSchedule],
    synchronize: false,
  }),DoctorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
