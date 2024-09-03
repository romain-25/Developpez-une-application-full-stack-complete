import {Component, inject, Input} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-back',
  standalone: true,
  imports: [],
  templateUrl: './back.component.html',
  styleUrl: './back.component.scss'
})
export class BackComponent {
  location: Location = inject(Location);
  router:Router = inject(Router);
  @Input() path!: string;
  back(): void{
    (this.path) ? this.router.navigate([this.path]) : this.location.back();
  }
}
