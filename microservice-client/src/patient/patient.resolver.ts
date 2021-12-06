import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PatientAppointmentDTO } from "./dto/patient.dto";
import { PatientAppointmentInput } from "./input/patient.input";
import { PatientService } from "./patient.service";

@Resolver()
export class PatientResolver {

    constructor(private patientService: PatientService) { }

    @Query(() => String)
    sayHello(): string {
        return 'Hello World!';
    }
    @Mutation(() => PatientAppointmentDTO)
    async bookappointment(@Args('data') data: PatientAppointmentInput) {
        console.log("args", data.doctor_id)
        await this.patientService.bookAppointment(JSON.stringify(data))
        return {
            doctor_schedule_id: data.doctor_schedule_id
        }
    }
}