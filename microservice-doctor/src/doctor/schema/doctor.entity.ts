import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "doctor_table"})
export class Doctor {

    @PrimaryGeneratedColumn('increment')
    doctor_id: number;
    @Column()
    doctor_email_address: string;
    @Column()
    doctor_password: string;
    @Column()
    doctor_name: string;
    @Column()
    doctor_profile_image: string;
    @Column()
    doctor_phone_no: string;
    @Column()
    doctor_address: string;
    @Column()
    doctor_date_of_birth: Date;
    @Column()
    doctor_degree: string;
    @Column()
    doctor_expert_in: string;
    @Column({
        type: "enum",
        enum: ["Active", "Inactive"],
        default: "Active"
    })
    doctor_status: string;
    @Column()
    doctor_added_on: Date;
}