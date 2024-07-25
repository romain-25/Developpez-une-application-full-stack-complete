import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userservice: UserService = inject(UserService);

  ngOnInit(): void {}


  start() {
    this.userservice.profil().subscribe(res => {
      console.log(res)
    });
    alert('Commencez par lire le README et à vous de jouer !');
  }
}
