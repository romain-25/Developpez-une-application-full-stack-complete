import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserLoginModel} from "../models/UserLoginModel";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient = inject(HttpClient);

  login(userLogin:UserLoginModel):Observable<any>{
    return this.http.post<UserLoginModel>(environment.microservice_user + 'auth/login',userLogin);
  }

  profil(){
    // return this.http.get<UserModel>(environment.microservice_user + '/profil');
    console.log(environment.microservice_user + 'profil');
    return this.http.get(environment.microservice_user + 'profil');
  }
}
