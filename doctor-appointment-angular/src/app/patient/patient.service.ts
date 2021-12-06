import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "./../../environments/environment";
import { Apollo, gql, QueryRef } from 'apollo-angular';

export interface Character {
  name: string;
  homeworld: string;
  species: string;
}
export interface CharactersResult {
  count: number;
  characters: Character[];
}
@Injectable({
  providedIn: "root",
})
export class PatientService {
  private charactersQuery: QueryRef<{ characters: CharactersResult; }, { data: object; }> | null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private apollo: Apollo
  ) {
    console.log(this.router.url)
  }
  async saveAppointment(data): Promise<CharactersResult> {
    console.log("result",data)
    this.charactersQuery = this.apollo.watchQuery({
      // query: gql`query bookappointment(data: "{\"a\":1,\"b\":'2'}") `
      query: gql`mutation{
        bookappointment(data: {
          doctor_id:${data.doctor_id?data.doctor_id:`""`},
          patient_id:${data.patient_id?data.patient_id:`""`},
          doctor_schedule_id:${data.doctor_schedule_id?data.doctor_schedule_id:`""`},
          appointment_number:${data.appointment_number?data.appointment_number:0},
          reason_for_appointment:${data.reason_for_appointment?data.reason_for_appointment:`""`},
          appointment_time:${data.appointment_time?data.appointment_time:`""`}
        }){
          doctor_schedule_id
        }
      }`,
      
      variables: { data: {} },
    });
    const result = await this.charactersQuery?.refetch();
    console.log("result",result)
    return result.data.characters;
  }
  public getSimpleAccessTokenId() {
    const token = localStorage.getItem("needletoken");
    return token;
  }

  public getAccessTokenId() {
    const token = localStorage.getItem("needletokenId");
    return token;
  }

  public getdecodedAccessTokenId() {
    const token = localStorage.getItem("needletoken") || '';
    try {
      return JSON.parse(token);
    } catch (ex) {
      console.log("ex", ex);
    }
  }

  public saveToken(token:string) {
    localStorage.setItem("needletokenId", token);
    localStorage.setItem("needletoken", JSON.stringify(token));
  }
  public get_all_doctor_schedules(): Observable<any> {
    const url =  environment.apiPath + `/patients/doctor_schedule`;
    return this.http.get(url);
  }
  public get_patient_by_id(id:number): Observable<any> {
    const url =  environment.apiPath + `/patients/${id}`;
    return this.http.get(url);
  }
  public edit_patient_profile_info(id:number,data:object): Observable<any> {
    const url =  environment.apiPath + `/patients/${id}`;
    return this.http.put(url,data);
  }
  public get_all_patient_appointments(id:number): Observable<any> {
    const url =  environment.apiPath + `/patients/${id}/appointments`;
    return this.http.get(url);
  }
  public register_patient(data:object): Observable<any> {
    const url =  environment.apiPath + `/patients`;
    return this.http.post(url,data);
  }
  public login_patient(data:object): Observable<any> {
    const url =  environment.apiPath + `/patients/login`;
    return this.http.post(url,data);
  }
  public add_appointment(data:object): Observable<any> {
    const url =  environment.apiPath + `/patients/login`;
    return this.http.post(url,data);
  }
//   private logOutFromDb() {
//     const url = environment.apiPath + `/auth/logout`;

//     return this.http.post(
//       url,
//       {},
//       {
//         headers: new HttpHeaders().set(
//           "Authorization",
//           this.getAccessTokenId()
//         ),
//       }
//     );
//     // .pipe(share());
//   }

//   public logout() {
//     // const needletoken = localStorage.removeItem("needletoken");
//     this.dataService.createData("/users/logout").subscribe(
//       () => {
//         this.helperService.toggleUiBlock("stop");
//         this.clearToken();
//         this.router.navigateByUrl("auth/login");
//       },
//       (err) => {
//         this.clearToken();
//       }
//     );
//   }
//   public login(username: string, password: string): Observable<any> {
//     const url = environment.apiPath + `/users/login`;

//     const body = {
//       username,
//       password,
//     };

//     return this.http.post(url, body);
//   }
//   // public getUsers(pageIndex = 1, pageSize = 10, query = {}): Observable<any> {
//   //   const url = CoreConfig.getPath() + `/users`;
//   //   query["pageIndex"] = String(pageIndex);
//   //   query["pageSize"] = String(pageSize);

//   //   const newParams = this.helperService.objectToHttpParams(query);
//   //   return this.http.get(url, {
//   //     params: newParams,
//   //     headers: new HttpHeaders().set("Authorization", this.getAccessTokenId()),
//   //   });
//   // }
//   /**
//    * Clear token and other user releated data.
//    */

//   public checkRole(roleid) {
//     const user = this.getPreferences();
//     if (user?.role_type === "superadmin") {
//       return true;
//     } else {
//       if (user?.roles_assigned.includes(roleid)) {
//         return true;
//       } else {
//         return false;
//       }
//     }
//   }

//   public clearToken() {
//     localStorage.removeItem("needletoken");
//     localStorage.removeItem("needletokenId");
//     localStorage.removeItem("preferences");
//     this.router.navigateByUrl("");
//   }
}
