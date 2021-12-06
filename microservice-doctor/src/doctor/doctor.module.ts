import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './schema/doctor.entity';
import { DoctorSchedule } from './schema/doctorSchedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor,DoctorSchedule])],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule { }