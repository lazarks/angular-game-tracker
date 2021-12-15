import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule, SlickCarouselModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
