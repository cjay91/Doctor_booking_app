import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PatientAppointmentInput{
    @Field()
    doctor_id: number    
    @Field()
    patient_id: number
    @Field()
    doctor_schedule_id: number
    @Field()
    appointment_number: number
    @Field()
    reason_for_appointment: string
    @Field()
    appointment_time: Date
}