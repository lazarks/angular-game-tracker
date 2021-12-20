import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  slides = [
    { img: '../../../assets/background/2066813.jpg' },
    { img: '../../../assets/background/2066813.jpg' },
    { img: '../../../assets/background/2066813.jpg' },
    { img: '../../../assets/background/2066813.jpg' },
    { img: '../../../assets/background/2066813.jpg' },
  ];
  slideConfig = {
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

  addSlide() {
    this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: Object) {
    console.log('slick initialized');
  }

  breakpoint(e: Object) {
    console.log('breakpoint');
  }

  afterChange(e: Object) {
    console.log('afterChange');
  }

  beforeChange(e: Object) {
    console.log('beforeChange');
  }

  constructor() {}

  ngOnInit(): void {}
}
