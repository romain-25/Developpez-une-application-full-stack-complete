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
  prefix: string = "/auth/";

  login(userLogin:UserLoginModel):Observable<any>{
    return this.http.post<UserLoginModel>(environment.developpement + this.prefix +'login',userLogin);
  }
  register(userRegister:UserRegisterModel):Observable<any>{
    return this.http.post<UserRegisterModel>(environment.developpement + this.prefix + 'register',userRegister);
  }
  profil(email: string):Observable<any>{
      let userEmail: UserEmailModel = {username: "",email: email}
      return this.http.post(environment.developpement + this.prefix +'profil', userEmail);
  }
  editProfil(email:UserEmailModel):Observable<any>{
    return this.http.put<UserEmailModel>(environment.developpement + this.prefix + 'profil', email);
  }
  getUserThemes(): Observable<any> {
    //TODO change for id localstorage
    const userId = 1;
    return this.http.get(`${environment.developpement + this.prefix}${userId}/themes`);
  }
}
