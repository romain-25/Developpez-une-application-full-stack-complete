import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticleModel} from "../models/ArticleModel";
import {environment} from "../../environments/environment";
import {ThemeModelDto} from "../models/ThemeModelDto";

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
    return this.http.get<ThemeModelDto[]>(environment.developpement + this.prefix + 'theme/all/1')
  }
  subscribeTheme(subscribe: boolean, userId: number, themeId: number):Observable<any>{
    let subscribeURL: string = (subscribe) ? "unsubscribe" : "subscribe";
    return this.http.post(`${environment.developpement + this.prefix + subscribeURL}/${userId}/${themeId}`,{});
  }
  subscribeToTheme(userId: number, themeId: number): Observable<any> {
    return this.http.post(`${environment.developpement + this.prefix }subscribe/${userId}/${themeId}`, {});
  }
  unsubscribeFromTheme(userId: number, themeId: number): Observable<any> {
    return this.http.post(`${environment.developpement + this.prefix }unsubscribe/${userId}/${themeId}`, {});
  }
}
