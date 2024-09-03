import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {TokenModel} from "../models/TokenModel";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  router:Router = inject(Router)
  private tokenKey = 'tokenModel';

  public isLogged: boolean = false;

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }
  setSession(tokenModel: TokenModel): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(tokenModel));
  }
  getSession(): TokenModel | null {
    const tokenJson = localStorage.getItem(this.tokenKey);
    if (tokenJson) {
      return JSON.parse(tokenJson);
    }
    return null;
  }
  isAuthenticated(): boolean {
    if(this.getSession() != null){
      return true
    }else{
      return false;
    }
  }
  initSession() {
    const tokenJson = localStorage.getItem(this.tokenKey);
    if (tokenJson) {
      const tokenModel = JSON.parse(tokenJson);
      this.setSession(tokenModel);
      this.isLogged = true;
      this.next();
    } else {
      this.isLogged = false;
      this.next();
    }
  }
  public logIn(token: TokenModel): void {
    if(token){
      localStorage.setItem('tokenModel', JSON.stringify(token));
      this.isLogged = true;
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
