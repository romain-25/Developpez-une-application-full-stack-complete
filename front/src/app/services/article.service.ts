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
  private http: HttpClient = inject(HttpClient);

  getAllArticles():Observable<any>{
    return this.http.get<ArticleModel[]>(environment.microservice_article + "all")
  }
  createArticle(article:ArticleModel):Observable<any>{
    let tokenJson: string | null = localStorage.getItem('token')
    let tokenModel: TokenModel = {} as TokenModel;
    if(tokenJson){
      tokenModel = JSON.parse(tokenJson);
    }
    article.authorUsername = tokenModel.username;
    return this.http.post<ArticleModel>(environment.microservice_article + 'create',article);
  }
  getSingleArticle(id:number):Observable<any>{
    return this.http.get<ArticleModel>(environment.microservice_article + 'single/' + id);
  }
}
