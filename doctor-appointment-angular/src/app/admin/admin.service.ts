import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  public getSimpleAccessTokenId() {
    const token = localStorage.getItem("profile");
    return token;
  }

  public getAccessTokenId() {
    const token = localStorage.getItem("profile");
    return token;
  }

  public getdecodedAccessTokenProfile() {
    const profile = localStorage.getItem("profile") || '';
    try {
      if(profile){
        return JSON.parse(profile).token;
      }else{
        return '';
      }
    } catch (ex) {
      console.log("ex", ex);
      return '';
    }
  }

  public saveToken(token:string) {
    localStorage.setItem("needletokenId", token);
    localStorage.setItem("needletoken", JSON.stringify(token));
  }

  public get_total_today_appointment(): Observable<any> {
    const url =  environment.apiPath + `/admin/total_today_appointment`;
    return this.http.get(url,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }

  public get_total_yesterday_appointment(): Observable<any> {
    const url =  environment.apiPath + `/admin/total_yesterday_appointment`;
    return this.http.get(url,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }

  public get_total_seven_day_appointment(): Observable<any> {
    const url =  environment.apiPath + `/admin/total_seven_day_appointment`;
    return this.http.get(url,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }
  
  public get_total_appointment(): Observable<any> {
    const url =  environment.apiPath + `/admin/total_appointment`;
    return this.http.get(url,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }
  
  public get_total_patient(): Observable<any> {
    const url =  environment.apiPath + `/admin/total_patient`;
    return this.http.get(url,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }

  public get_all_doctors(): Observable<any> {
    const url =  environment.apiPath + `/doctors`;
    return this.http.get(url,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }

  public add_doctor(data:object): Observable<any> {
    const url =  environment.apiPath + `/doctors`;
    return this.http.post(url,data,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }

  public add_doctor_schedule(data:object): Observable<any> {
    const url =  environment.apiPath + `/doctors/schedule`;
    return this.http.post(url,data,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }

  public edit_doctor_schedule(id:number,data:object): Observable<any> {
    const url =  environment.apiPath + `/doctors/schedule/${id}`;
    return this.http.put(url,data,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }

  public remove_doctor_schedule(id:number): Observable<any> {
    const url =  environment.apiPath + `/doctors/schedule/${id}`;
    return this.http.delete(url,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }

  public edit_doctor(id:number,data:object): Observable<any> {
    const url =  environment.apiPath + `/doctors/${id}`;
    return this.http.put(url,data,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }
  public remove_doctors(id:number): Observable<any> {
    const url =  environment.apiPath + `/doctors/${id}`;
    return this.http.delete(url,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }
  public get_all_patients(): Observable<any> {
    const url =  environment.apiPath + `/patients`;
    return this.http.get(url,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }
  public get_all_doctor_schedule(): Observable<any> {
    const url =  environment.apiPath + `/admin/doctor_schedule`;
    return this.http.get(url,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }
  public get_all_appointment(): Observable<any> {
    const url =  environment.apiPath + `/admin/appointments`;
    return this.http.get(url,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }
  public get_appointment_by_id(id): Observable<any> {
    const url =  environment.apiPath + `/admin/appointments/${id}`;
    return this.http.get(url,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }
  public get_all_admin_info_by_id(id:number): Observable<any> {
    const url =  environment.apiPath + `/admin/${id}`;
    return this.http.get(url,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }  
  public edit_profile_info(id:number,data:object): Observable<any> {
    const url =  environment.apiPath + `/admin/${id}`;
    return this.http.put(url,data,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }
  public get_doctor_info_by_id(id:number): Observable<any> {
    const url =  environment.apiPath + `/doctors/${id}`;
    return this.http.get(url,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }  
  public edit_doctor_profile_info(id:number,data:object): Observable<any> {
    const url =  environment.apiPath + `/doctors/${id}`;
    return this.http.put(url,data,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }
  public edit_admin_profile_info(id:number,data:object): Observable<any> {
    const url =  environment.apiPath + `/admin/${id}`;
    return this.http.put(url,data,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }
  public login_admin(data:object): Observable<any> {
    const url =  environment.apiPath + `/admin/login`;
    return this.http.post(url,data,{headers:{Authorization:this.getdecodedAccessTokenProfile()}});
  }
//   private logOutFromDb() {
//     const url = environment.apiPath + `/admin/auth/logout`;

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
//     const url = environment.apiPath + `/admin/users/login`;

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
