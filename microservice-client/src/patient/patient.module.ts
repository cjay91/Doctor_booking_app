import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { PatientResolver } from './patient.resolver';

@Module({
  imports: [],
  controllers: [PatientController],
  providers: [PatientResolver,PatientService],
})
export class PatientModule {}
