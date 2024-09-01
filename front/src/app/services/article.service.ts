import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticleModel} from "../models/ArticleModel";
import {environment} from "../../environments/environment";
import {ThemeModelDto} from "../models/ThemeModelDto";
import {CommentDto} from "../models/CommentDto";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  prefix: string = "/article/";
  private http: HttpClient = inject(HttpClient);

  getAllArticles():Observable<any>{
    return this.http.get<ArticleModel[]>(environment.developpement + this.prefix + "all")
  }
  createArticle(article:ArticleModel):Observable<any>{
    return this.http.post<ArticleModel>(environment.developpement + this.prefix + 'create',article);
  }
  getSingleArticle(id:number):Observable<any>{
    return this.http.get<ArticleModel>(environment.developpement + this.prefix + 'single/' + id);
  }
  getThemes(): Observable<any>{
    return this.http.get<ThemeModelDto[]>(environment.developpement + this.prefix + 'theme/all')
  }
  subscribeTheme(subscribe: boolean, userId: number, themeId: number):Observable<any>{
    let subscribeURL: string = (subscribe) ? "unsubscribe" : "subscribe";
    return this.http.post(`${environment.developpement + this.prefix + subscribeURL}/${userId}/${themeId}`,{});
  }
  subscribeToTheme(themeId: number): Observable<any> {
    return this.http.post(`${environment.developpement + this.prefix }subscribe/${themeId}`, {});
  }
  unsubscribeFromTheme(themeId: number): Observable<any> {
    return this.http.post(`${environment.developpement + this.prefix }unsubscribe/${themeId}`, {});
  }
  addComment(articleId: number, comment: CommentDto): Observable<any> {
    return this.http.post(`${environment.developpement + this.prefix + articleId + "/"}comment`, comment);
  }
}
