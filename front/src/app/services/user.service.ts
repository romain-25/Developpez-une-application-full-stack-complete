import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient = inject(HttpClient);

  profil(){
    // return this.http.get<UserModel>(environment.microservice_user + '/profil');
    console.log(environment.microservice_user + 'profil');
    return this.http.get(environment.microservice_user + 'profil');
  }
}
