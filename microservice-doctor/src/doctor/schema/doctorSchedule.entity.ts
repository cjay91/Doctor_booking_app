import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "doctor_schedule_table"})
export class DoctorSchedule {

    @PrimaryGeneratedColumn('increment')
    doctor_schedule_id: number;
    @Column()
    doctor_id: number;
    @Column()
    doctor_schedule_date: Date;
    @Column()
    doctor_schedule_start_time: string;
    @Column()
    doctor_schedule_end_time: string;
    @Column()
    average_consulting_time: string;
    @Column({
        type: "enum",
        enum: ["Active", "Inactive"],
        default: "Active"
    })
    doctor_schedule_status: string;
}