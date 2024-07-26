import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserLoginModel} from "../../models/UserLoginModel";
import {TokenModel} from "../../models/TokenModel";
import {BackComponent} from "../../components/back/back.component";

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
  userService:UserService = inject(UserService);
  public form: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.min(3)]]
  });

  connexion(): void{
    const userLogin: UserLoginModel = this.form.value as UserLoginModel;
    this.userService.login(userLogin).subscribe((result:TokenModel): void =>{
      console.log(result)
    })
  }
}
