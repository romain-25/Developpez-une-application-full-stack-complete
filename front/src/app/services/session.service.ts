import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";

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

  public logIn(token: string, email: string): void {
    // this.user = user;
    if(token){
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      this.isLogged = true;
      //this.router.navigate(['/articles'])
      this.router.navigate(['/profile'])
      this.next();
    }
  }

  public logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    // this.user = undefined;
    this.isLogged = false;
    this.router.navigate(['/login'])
    this.next();
  }

  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }
}
