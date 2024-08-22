import {Component, inject, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BackComponent} from "../../../components/back/back.component";
import {ArticleService} from "../../../services/article.service";
import {ArticleModel} from "../../../models/ArticleModel";
import {DatePipe} from "@angular/common";
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-single-article',
  standalone: true,
  imports: [
    BackComponent,
    DatePipe,
    MatCard
  ],
  templateUrl: './single-article.component.html',
  styleUrl: './single-article.component.scss'
})
export class SingleArticleComponent {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  articleService: ArticleService = inject(ArticleService);
  articleId!: number;
  article!: ArticleModel;
  ngOnInit(): void {
    this.articleId = Number(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.articleService.getSingleArticle(this.articleId).subscribe((result: ArticleModel) => {
      this.article = result
    })
  }
}
