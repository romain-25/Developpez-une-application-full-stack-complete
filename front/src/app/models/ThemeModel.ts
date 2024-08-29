import {ArticleModel} from "./ArticleModel";

export interface ThemeModel{
  id: number;
  title: string;
  articles: ArticleModel[]
}
