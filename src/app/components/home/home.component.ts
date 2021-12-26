import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  slides!: Game[];
  slideConfig: Object;

  constructor(private httpService: HttpService, private router: Router) {
    this.slideConfig = {
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 800, settings: { slidesToShow: 2 } },
        { breakpoint: 600, settings: { slidesToShow: 1 } },
      ],
      autoplay: true,
      autoplaySpeed: 3000,
    };
  }

  ngOnInit(): void {
    this.slides = [];
    this.getGameDetails('415171');
    this.getGameDetails('3272');
    this.getGameDetails('3439');
    this.getGameDetails('290856');
    this.getGameDetails('23598');
  }

  getGameDetails(id: string): void {
    this.httpService.getGameDetails(id).subscribe((response: Game) => {
      let temp = response.description_raw;
      let newDesc = temp.substring(
        0,
        temp.indexOf('.', temp.indexOf('.') + 1) + 1
      );
      response.description_raw = newDesc; // first 2 sentences

      this.slides.push(response);
    });
  }

  openGameOverview(id: string): void {
    this.router.navigate(['overview', id]);
  }

  addSlide() {
    // this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }

  removeSlide() {
    // this.slides.length = this.slides.length - 1;
  }

  slickInit(e: Object) {
    // console.log('slick initialized');
  }

  breakpoint(e: Object) {
    // console.log('breakpoint');
  }

  afterChange(e: Object) {
    // console.log('afterChange');
  }

  beforeChange(e: Object) {
    // console.log('beforeChange');
  }
}
