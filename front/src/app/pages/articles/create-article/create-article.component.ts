import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ThemeModel} from "../../../models/ThemeModel";
import {ArticleService} from "../../../services/article.service";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {BackComponent} from "../../../components/back/back.component";
import {AsyncPipe} from "@angular/common";
import {TokenModel} from "../../../models/TokenModel";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-create-article',
  standalone: true,
  templateUrl: './create-article.component.html',
  imports: [
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    BackComponent,
    MatOption,
    AsyncPipe,
    MatButton
  ],
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent {
  articleService: ArticleService = inject(ArticleService);
  fb: FormBuilder = inject(FormBuilder);
  myControl = new FormControl<string | ThemeModel>('');

  public form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
    // authorID: '',
    authorUsername: '',
    themeID: '',
    themeTitle: '',
  });

  options: ThemeModel[] = [
    {id: 1, title: 'Developement', content: 'Theme is for software and web developer'},
    {id: 2, title: 'Photography', content: 'Theme is for photo and movie'},
    {id: 3, title: 'Design', content: 'Theme is for designer and infography'},
  ];
  filteredOptions!: Observable<ThemeModel[]>;

  ngOnInit() {
    let tokenJson: string | null = localStorage.getItem('tokenModel')
    let tokenModel: TokenModel = {} as TokenModel;
    if(tokenJson){
      tokenModel = JSON.parse(tokenJson);
    }
    console.log("tokenModel.username", tokenModel);
    this.form.patchValue({
      authorUsername: tokenModel.username,
      // authorId: tokenModel.id,
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const title = typeof value === 'string' ? value : value?.title;
        return title ? this._filter(title as string) : this.options.slice();
      }),
    );

    this.myControl.valueChanges.subscribe(value => {
      if (typeof value === 'object' && value !== null) {
        this.form.patchValue({
          themeID: value.id,
          themeTitle: value.title,
        });
      } else {
        this.form.patchValue({
          themeID: '',
          themeTitle: '',
        });
      }
    });
  }

  displayFn(theme: ThemeModel): string {
    return theme && theme.title ? theme.title : '';
  }

  private _filter(title: string): ThemeModel[] {
    const filterValue = title.toLowerCase();
    return this.options.filter(option => option.title.toLowerCase().includes(filterValue));
  }

  create() {
    console.log('form.value', this.form.value)
    this.articleService.createArticle(this.form.value).subscribe((result: any) => {
      console.log(result);
    });
  }
}
