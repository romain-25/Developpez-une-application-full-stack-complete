import {LOCALE_ID, NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
