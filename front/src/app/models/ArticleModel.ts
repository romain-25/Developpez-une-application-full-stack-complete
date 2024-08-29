import {AuthorModel} from "./AuthorModel";
import {ThemeModelDto} from "./ThemeModelDto";

export interface ArticleModel {
  id: number;
  title: string;
  content: string;
  publishedDate: Date;
  author: AuthorModel;
  theme: ThemeModelDto;
}
