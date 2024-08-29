import {ChangeDetectorRef, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ThemeModelDto} from "../../../models/ThemeModelDto";
import {MatCard} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {ArticleService} from "../../../services/article.service";
import {TokenModel} from "../../../models/TokenModel";

@Component({
  selector: 'app-card-theme',
  standalone: true,
  imports: [
    MatCard,
    MatButton
  ],
  templateUrl: './card-theme.component.html',
  styleUrl: './card-theme.component.scss'
})
export class CardThemeComponent {
  articleService: ArticleService = inject(ArticleService);
  cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  @Input() subscribe!: boolean;
  @Input() theme!: ThemeModelDto;
  @Input() themeUser!: ThemeModelDto[];
  @Output() themeChanged: EventEmitter<void> = new EventEmitter<void>();

  subscribeString!: string;
  ngOnInit(): void {
    this.updateSubscribeString();
    this.checkTheme(this.theme.id);
  }
  checkTheme(themeId: number): boolean {
    if(this.themeUser.find((t) => t.id === themeId)) {
      return true;
    }else{
      return false;
    }
  }

  updateSubscribeString(): void {
    this.subscribeString = this.subscribe ? 'Se désinscrire' : 'S\'inscrire';
    this.cd.detectChanges();
    this.themeChanged.emit();
  }

  subscribeTheme(): void {
    let tokenJson: string | null = localStorage.getItem('tokenModel')
    let tokenModel: TokenModel = {} as TokenModel;
    if(tokenJson){
      tokenModel = JSON.parse(tokenJson);
    }
    if (this.subscribe) {
      this.articleService.unsubscribeFromTheme(tokenModel.id, this.theme.id).subscribe(
        () => {
          this.subscribe = false;
          this.updateSubscribeString();
        },
        error => console.error('Erreur lors de la désinscription', error)
      );
    } else {
      this.articleService.subscribeToTheme(tokenModel.id, this.theme.id).subscribe(
        () => {
          this.subscribe = true;
          this.updateSubscribeString();
        },
        error => console.error('Erreur lors de l\'inscription', error)
      );
    }
  }
}
