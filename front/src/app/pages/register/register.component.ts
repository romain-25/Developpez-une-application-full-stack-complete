import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserRegisterModel} from "../../models/UserRegisterModel";
import {BackComponent} from "../../components/back/back.component";
import {Router} from "@angular/router";
import {SessionService} from "../../services/session.service";

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
  router:Router = inject(Router);
  sessionService:SessionService = inject(SessionService);

  public form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$')]],
  });

  register(): void{
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // This will mark all controls as touched to show validation errors
      return;
    }

    const userRegister: UserRegisterModel = this.form.value as UserRegisterModel;
    this.userService.register(userRegister).subscribe( result =>{
      this.sessionService.logIn(result)
      // TODO do catch
    }, error => console.log(error));
  }
}
