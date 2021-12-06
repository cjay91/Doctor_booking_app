import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/schema/admin.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'doctor_appointment',
    // entities: ['admin_table','appointment_table','doctor_schedule_table','doctor_table','patient_table'],
    entities: [Admin],
    synchronize: false,
    // autoLoadEntities: true,
  }),AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }