import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserLoginModel} from "../models/UserLoginModel";
import {Observable} from "rxjs";
import {UserRegisterModel} from "../models/UserRegisterModel";
import {UserEmailModel} from "../models/UserEmailModel";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient = inject(HttpClient);

  login(userLogin:UserLoginModel):Observable<any>{
    return this.http.post<UserLoginModel>(environment.microservice_user + 'login',userLogin);
  }

  register(userRegister:UserRegisterModel):Observable<any>{
    return this.http.post<UserRegisterModel>(environment.microservice_user + 'register',userRegister);
  }

  profil(email: string):Observable<any>{
      let userEmail: UserEmailModel = {username: "",email: email}
      return this.http.post(environment.microservice_user + 'profil', userEmail);
  }
  editProfil(email:UserEmailModel):Observable<any>{
    return this.http.put<UserEmailModel>(environment.microservice_user + 'profil', email);
  }
}
