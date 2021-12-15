import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  slides = [
    { img: '../../../assets/images/recommended/food-image-1.jpg' },
    { img: '../../../assets/images/recommended/food-image-2.jpg' },
    { img: '../../../assets/images/recommended/food-image-3.jpg' },
    { img: '../../../assets/images/recommended/food-image-4.jpg' },
    { img: '../../../assets/images/recommended/food-image-5.jpg' },
    { img: '../../../assets/images/recommended/food-image-6.jpg' },
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
