import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticleModel} from "../models/ArticleModel";
import {environment} from "../../environments/environment";
import {TokenModel} from "../models/TokenModel";

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
}
