import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {CardArticleComponent} from "../articles/card-article/card-article.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {ArticleService} from "../../services/article.service";
import {ThemeModelDto} from "../../models/ThemeModelDto";
import {CardThemeComponent} from "./card-theme/card-theme.component";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [
    CardArticleComponent,
    MatButton,
    MatIcon,
    RouterLink,
    CardThemeComponent
  ],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss'
})
export class ThemesComponent {
  articleService: ArticleService= inject(ArticleService);
  userService: UserService= inject(UserService);
  cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  themes: ThemeModelDto[] = [];
  themesUser: ThemeModelDto[] = [];

  ngOnInit(): void {
    this.loadThemes();
    this.loadUserThemes();
  }

  loadThemes(): void {
    this.articleService.getThemes().subscribe(
      data => {
        this.themes = data;
        console.log("this.themes", this.themes);
      },
      error => console.error('Erreur lors du chargement des thèmes', error)
    );
  }

  loadUserThemes(): void {
    this.userService.getUserThemes().subscribe(
      data => {
        this.themesUser = data;
      },
      error => console.error('Erreur lors du chargement des thèmes de l\'utilisateur', error)
    );
  }
}
