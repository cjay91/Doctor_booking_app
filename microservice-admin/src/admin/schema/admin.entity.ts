import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "admin_table"})
export class Admin {

    @PrimaryGeneratedColumn()
    admin_id: number;
    @Column()
    admin_email_address: string;
    @Column()
    admin_password: string;
    @Column()
    admin_name: string;
    @Column()
    hospital_name: string;
    @Column()
    hospital_address: string;
    @Column()
    hospital_contact_no: string;
    @Column()
    hospital_logo: string;
}