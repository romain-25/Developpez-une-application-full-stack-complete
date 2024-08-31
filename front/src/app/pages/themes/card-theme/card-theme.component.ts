import {ChangeDetectorRef, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ThemeModelDto} from "../../../models/ThemeModelDto";
import {MatCard} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {ArticleService} from "../../../services/article.service";
import {TokenModel} from "../../../models/TokenModel";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-card-theme',
  standalone: true,
  imports: [
    MatCard,
    MatButton,
    NgIf
  ],
  templateUrl: './card-theme.component.html',
  styleUrl: './card-theme.component.scss'
})
export class CardThemeComponent {
  articleService: ArticleService = inject(ArticleService);
  cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  @Input() theme!: ThemeModelDto;
  @Input() themeUser!: ThemeModelDto[];
  @Input() profile!: boolean;
  @Output() change:EventEmitter<void> = new EventEmitter();

  subscribeString!: string;
  ngOnInit(): void {
      this.updateSubscribeString();
  }

  updateSubscribeString(): void {
      this.subscribeString = this.theme.subscribed ? 'Se désinscrire' : 'S\'inscrire';
  }

  subscribeTheme(): void {
    let tokenJson: string | null = localStorage.getItem('tokenModel')
    let tokenModel: TokenModel = {} as TokenModel;
    if(tokenJson){
      tokenModel = JSON.parse(tokenJson);
    }
    if (this.theme.subscribed) {
      this.articleService.unsubscribeFromTheme(tokenModel.id, this.theme.id).subscribe(
        (data: ThemeModelDto) => {
          if(data.id == this.theme.id){
            this.theme = data;
          }
          if(this.profile){
            this.change.emit();
          }
          this.updateSubscribeString();
        },
        error => console.error('Erreur lors de la désinscription', error)
      );
    } else {
      this.articleService.subscribeToTheme(tokenModel.id, this.theme.id).subscribe(
          (data: ThemeModelDto) => {
            if(data.id == this.theme.id){
              this.theme = data;
            }
          this.updateSubscribeString();
        },
        error => console.error('Erreur lors de l\'inscription', error)
      );
    }
  }
}
