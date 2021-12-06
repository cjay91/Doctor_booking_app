import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "patient_table"})
export class Patient {

    @PrimaryGeneratedColumn()
    patient_id: number;
    @Column()
    patient_email_address: string;
    @Column()
    patient_password: string;
    @Column()
    patient_first_name: string;
    @Column()
    patient_last_name: string;
    @Column()
    patient_date_of_birth: Date;
    @Column({
        type: "enum",
        enum: ["Male", "Female","Other"]
    })
    patient_gender: string;
    @Column()
    patient_address: string;
    @Column()
    patient_phone_no: string;    
    @Column()
    patient_maritial_status: string;
    @Column()
    patient_added_on: Date;
    @Column()
    patient_verification_code: string;
    @Column({
        type: "enum",
        enum: ["No", "Yes"],
        default: "No"
    })
    email_verify: string;
}