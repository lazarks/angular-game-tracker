import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { GamesComponent } from './components/games/games.component';
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/games/search/search.component';
import { OverviewComponent } from './components/overview/overview.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent, GamesComponent, SearchComponent, OverviewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
