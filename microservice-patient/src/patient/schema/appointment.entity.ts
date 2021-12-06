import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "appointment_table"})
export class Appointment {

    @PrimaryGeneratedColumn()
    appointment_id: number;
    @Column()
    doctor_id: number;
    @Column()
    patient_id: number;
    @Column()
    doctor_schedule_id: number;
    @Column()
    appointment_number: number;
    @Column()
    reason_for_appointment: string;
    @Column()
    appointment_time: Date;   
    @Column({
        type: "enum",
        enum: ["Yes", "No"]
    })
    status: string;    
    @Column({
        type: "enum",
        enum: ["Yes", "No"]
    })
    patient_come_into_hospital: string; 
    @Column()
    doctor_comment: string;
}