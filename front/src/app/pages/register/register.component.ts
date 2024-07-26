import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserRegisterModel} from "../../models/UserRegisterModel";
import {BackComponent} from "../../components/back/back.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButton,
    ReactiveFormsModule,
    BackComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fb:FormBuilder = inject(FormBuilder);
  userService:UserService = inject(UserService);
  public form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$')]],
  });

  register(): void{
    const userRegister: UserRegisterModel = this.form.value as UserRegisterModel;
    this.userService.register(userRegister).subscribe( result =>{
      console.log(result);
    })
  }
}
