import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class PatientResolver{
@Query(()=>String)
hello(){
    return "abc"
}
}