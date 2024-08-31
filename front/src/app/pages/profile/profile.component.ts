import {Component, inject} from '@angular/core';
import {BackComponent} from "../../components/back/back.component";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SessionService} from "../../services/session.service";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/UserModel";
import {MessageModel} from "../../models/MessageModel";
import {TokenModel} from "../../models/TokenModel";
import {CardThemeComponent} from "../themes/card-theme/card-theme.component";
import {ThemeModelDto} from "../../models/ThemeModelDto";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    BackComponent,
    MatButton,
    ReactiveFormsModule,
    CardThemeComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user!: UserModel;
  fb:FormBuilder = inject(FormBuilder);
  email: string | null = "";
  public sessionService:SessionService = inject(SessionService);
  userService:UserService = inject(UserService);
  public form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });
  ngOnInit(): void{
    let tokenJson: string | null = localStorage.getItem('tokenModel')
    let tokenModel: TokenModel = {} as TokenModel;
    if(tokenJson){
      tokenModel = JSON.parse(tokenJson);
    }
    // TODO change email with recovery token in backend
    this.email = tokenModel.email
    if(this.email != null){
        this.getProfile(this.email);
    }
  }
  getProfile(email: string){
    this.userService.profil(email).subscribe( (result: UserModel): void=>{
      console.log(result)
      if(result){
        this.user = result;
        this.form.setValue(
          {
            username: result.username,
            email: result.email,
          }
        )
      }
    })
  }
  onThemeChanged(){
    this.userService.getUserThemes().subscribe((result: ThemeModelDto[]) =>{
      this.user.themes = result
    })
  }
  save(): void{
    this.userService.editProfil(this.form.value).subscribe( (result:MessageModel): void=>{
      console.log(result)
    })
  }

}
