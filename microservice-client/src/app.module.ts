import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [ GraphQLModule.forRoot({
    debug: false,
    playground: true,
    autoSchemaFile: true,

  }),AdminModule,DoctorModule,PatientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
