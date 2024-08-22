import {Component, inject} from '@angular/core';
import {BackComponent} from "../../../components/back/back.component";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {AsyncPipe} from "@angular/common";
import {map, Observable, startWith} from "rxjs";
import {ThemeModel} from "../../../models/ThemeModel";
import {ArticleService} from "../../../services/article.service";

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [
    BackComponent,
    FormsModule,
    MatButton,
    ReactiveFormsModule,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
    MatAutocompleteTrigger
  ],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss'
})
export class CreateArticleComponent {
  articleService:ArticleService =inject(ArticleService);
  fb:FormBuilder = inject(FormBuilder);
  myControl = new FormControl<string | ThemeModel>('');

  public form: FormGroup = this.fb.group({
    theme: this.myControl,
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
  });
  //Fixme change with data to data base
  options: ThemeModel[] = [
    {id: 1, title: 'Developement', content:'Theme is for software and web developer'},
    {id: 2, title: 'Photography', content:'Theme is for photo and movie'},
    {id: 3, title: 'Design', content:'Theme is for designer and infography'},
  ];
  filteredOptions!: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.title;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(user: ThemeModel): string {
    return user && user.title ? user.title : '';
  }

  private _filter(name: string): ThemeModel[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.title.toLowerCase().includes(filterValue));
  }

  create(){
    this.articleService.createArticle(this.form.value).subscribe((result:any)=>{
      console.log(result)
    })
  }
}
export interface User {
  name: string;
}
