import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {TokenModel} from "../models/TokenModel";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  router:Router = inject(Router)

  public isLogged: boolean = false;
  // public user: User | undefined;

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public logIn(token: TokenModel): void {
    // this.user = user;
    if(token){
      localStorage.setItem('tokenModel', JSON.stringify(token));
      this.isLogged = true;
      //this.router.navigate(['/articles'])
      this.router.navigate(['/articles'])
      this.next();
    }
  }

  public logOut(): void {
    localStorage.removeItem('tokenModel');
    // this.user = undefined;
    this.isLogged = false;
    this.router.navigate(['/login'])
    this.next();
  }

  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }
}
