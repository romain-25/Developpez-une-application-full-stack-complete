import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserLoginModel} from "../../models/UserLoginModel";
import {TokenModel} from "../../models/TokenModel";
import {BackComponent} from "../../components/back/back.component";
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    ReactiveFormsModule,
    BackComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb:FormBuilder = inject(FormBuilder);
  router:Router = inject(Router);
  userService:UserService = inject(UserService);
  sessionService:SessionService = inject(SessionService);

  public form: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.min(3)]]
  });

  connexion(): void{
    const userLogin: UserLoginModel = this.form.value as UserLoginModel;
    this.userService.login(userLogin).subscribe((result:TokenModel): void =>{
      console.log(result)
      this.sessionService.logIn(result.token, userLogin.email)
      // TODO do catch
    }, error => console.log(error));
  }
}
