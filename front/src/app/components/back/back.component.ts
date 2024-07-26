import {Component, inject} from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-back',
  standalone: true,
  imports: [],
  templateUrl: './back.component.html',
  styleUrl: './back.component.scss'
})
export class BackComponent {
  location: Location = inject(Location);
  back(): void{
    this.location.back();
  }
}
